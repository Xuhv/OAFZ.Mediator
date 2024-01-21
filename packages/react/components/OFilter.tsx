import { ReactNode, useRef } from 'react';
import { Control, FieldValues, Path, UseFormProps, useForm } from 'react-hook-form';
import { changeQueryRequester } from '../plugins/SearchChangePlugin';
import { mergeRefs } from '../utils/mergeRefs';
import { omit } from 'lodash-es';

interface OFilterProps<T extends FieldValues>
  extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  ref?: ((instance: HTMLFormElement | null) => void) | React.RefObject<HTMLFormElement>;
  /**
   * It has been implemented in this component, don't use it.
   */
  onSubmit?: undefined;
  useFormProps?: UseFormProps<T, any>;
  formRender?: (control: Control<T, Path<T>>) => ReactNode;
  submitButton?: ReactNode;
  resetButton?: ReactNode;
}

/**
 * The component depends on SearchParamsPlugin.
 * Something should be noted is all fields will be set to '' when reset.
 * @param props
 * @returns
 */
export function OFilter<T extends FieldValues>(props: OFilterProps<T>) {
  const { control, handleSubmit, reset } = useForm(props.useFormProps);
  const formProps = omit(props, ['useFormProps', 'formRender', 'submitButtonRender', 'resetButtonRender']);
  const _formRef = useRef<HTMLFormElement>(null);
  const formRef = props.ref ? mergeRefs(props.ref, _formRef) : _formRef;

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
