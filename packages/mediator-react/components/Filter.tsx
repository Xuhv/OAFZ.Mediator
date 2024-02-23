import { ReactNode, useEffect, useRef, useState } from 'react';
import { Controller, ControllerProps, FieldValues, Path, PathValue, UseFormProps, useForm } from 'react-hook-form';
import { changeQueryRequester, queryChangedNotifier } from '../plugins/SearchChangePlugin';
import { mergeRefs } from '../utils/mergeRefs';

export interface ItemProps<T extends FieldValues> {
  fieldId: Path<T>;
  /**
   * @default ""
   */
  defaultValue?: PathValue<T, Path<T>>;
  render?: ControllerProps<T, Path<T>>['render'];
}

export interface FilterProps<T extends FieldValues>
  extends Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'> {
  ref?: ((instance: HTMLFormElement | null) => void) | React.RefObject<HTMLFormElement>;
  useFormProps?: UseFormProps<T, any>;
  items: ItemProps<T>[];
  /**
   * @default 4
   */
  limit?: number;
  submitButton?: ReactNode;
  resetButton?: ReactNode;
  expandButton?: ReactNode;
  collapseButton?: ReactNode;
  buttonGroupClassName?: string;
}

/**
 * The component is built on react-hook-form. Something notable:
 *
 * 1. The component depends on SearchParamsPlugin.
 *
 * 2. All fields will be set to '' when reset.
 *
 * 3. Every field needs a default value.
 * @param props
 * @returns
 */
export function Filter<T extends FieldValues>({
  useFormProps,
  items,
  ref,
  limit = 4,
  submitButton,
  resetButton,
  expandButton,
  collapseButton,
  buttonGroupClassName,
  ...formProps
}: FilterProps<T>) {
  const { control, handleSubmit, reset, setValue, getValues } = useForm(useFormProps);
  const _formRef = useRef<HTMLFormElement>(null);
  const formRef = ref ? mergeRefs(ref, _formRef) : _formRef;
  const [isExpanded, setIsExpanded] = useState(false);
  const itemsVisible = isExpanded ? items : items.slice(0, limit - 1);

  const ExpandOrCollapseButton = () => {
    if (isExpanded) return <span onClick={() => setIsExpanded(false)}>{collapseButton ?? 'collapse'}</span>;
    else return <span onClick={() => setIsExpanded(true)}>{expandButton ?? 'expand'}</span>;
  };

  useEffect(() => {
    return queryChangedNotifier.receive(async ({ payload }) => {
      for (const key in getValues()) {
        // @ts-expect-error
        if (payload[key]) setValue(key, payload[key]);
      }
    });
  }, []);

  const filter = () => _formRef.current?.requestSubmit();
  const resetAndFilter = () => {
    reset(values => {
      for (const key in values) {
        // @ts-expect-error
        values[key] = '';
      }
      return values;
    });
    filter();
  };

  return (
    <form
      ref={formRef}
      {...formProps}
      onSubmit={handleSubmit(data => {
        changeQueryRequester.send({ query: data, force: true, mode: 'merge' });
      })}
    >
      {itemsVisible.map(({ fieldId, render, defaultValue }) => (
        <Controller<T, Path<T>>
          key={fieldId}
          name={fieldId}
          control={control}
          // @ts-expect-error
          defaultValue={defaultValue ?? ''}
          render={
            render ??
            (({ field }) => (
              <label>
                <span>{fieldId}</span>
                <input {...field} />
              </label>
            ))
          }
        />
      ))}

      <span className={buttonGroupClassName}>
        <span onClick={filter}>{submitButton ?? 'submit'}</span>
        <span onClick={resetAndFilter}>{resetButton ?? 'reset'}</span>
        {items.length > limit - 1 && <ExpandOrCollapseButton />}
      </span>
    </form>
  );
}
