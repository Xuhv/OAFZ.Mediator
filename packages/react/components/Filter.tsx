import { ReactNode, useEffect, useRef } from 'react';
import { Control, FieldValues, Path, UseFormProps, useForm } from 'react-hook-form';
import { changeQueryRequester, queryChangedNotifier } from '../plugins/SearchChangePlugin';
import { mergeRefs } from '../utils/mergeRefs';
import { omit } from 'lodash-es';

interface FilterProps<T extends FieldValues>
  extends Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'> {
  ref?: ((instance: HTMLFormElement | null) => void) | React.RefObject<HTMLFormElement>;
  useFormProps?: UseFormProps<T, any>;
  formRender?: (control: Control<T, Path<T>>) => ReactNode;
  submitButton?: ReactNode;
  resetButton?: ReactNode;
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
export function Filter<T extends FieldValues>(props: FilterProps<T>) {
  const { control, handleSubmit, reset, setValue, getValues } = useForm(props.useFormProps);
  const formProps = omit(props, ['useFormProps', 'formRender', 'submitButton', 'resetButton']);
  const _formRef = useRef<HTMLFormElement>(null);
  const formRef = props.ref ? mergeRefs(props.ref, _formRef) : _formRef;

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
        console.log(data);
        changeQueryRequester.send({ query: data, force: true, mode: 'merge' });
      })}
    >
      {props.formRender?.(control)}

      {props.submitButton ? <span onClick={filter}>{props.submitButton}</span> : null}

      {props.resetButton ? <span onClick={resetAndFilter}>{props.resetButton}</span> : null}
    </form>
  );
}
