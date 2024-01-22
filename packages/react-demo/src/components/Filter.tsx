import { Button, Field, FieldProps, Input } from '@fluentui/react-components';
import { Search24Regular, ArrowReset24Regular } from '@fluentui/react-icons';
import { Filter as OFilter } from '@oafz/mediator-react/components/Filter';
import { Controller, ControllerProps, FieldValues, Path, PathValue } from 'react-hook-form';

export type FilterProps<T extends FieldValues> = {
  fields: {
    fieldId: Path<T>;
    /**
     * @default ""
     */
    defaultValue?: PathValue<T, Path<T>>;
    /**
     * Don't use with `render` together.
     */
    label?: FieldProps['label'];
    /**
     * Don't use with `label` together.
     */
    render?: ControllerProps<T, Path<T>>['render'];
  }[];
};

export function Filter<T extends FieldValues>({ fields }: FilterProps<T>) {
  return (
    <OFilter<T>
      style={{ display: 'flex', gap: '8px' }}
      formRender={control =>
        fields?.map(({ fieldId, label, render, defaultValue }) => (
          <Controller<T, Path<T>>
            key={fieldId}
            name={fieldId}
            control={control}
            // @ts-expect-error
            defaultValue={defaultValue ?? ''}
            render={
              render ??
              (({ field, fieldState: { error } }) => (
                <Field
                  label={label ?? fieldId}
                  validationMessage={error?.message}
                  orientation="horizontal"
                  style={{ display: 'unset' }}
                >
                  <Input {...field} />
                </Field>
              ))
            }
          />
        ))
      }
      submitButton={<Button appearance="primary" icon={<Search24Regular />} />}
      resetButton={<Button icon={<ArrowReset24Regular />} />}
    />
  );
}
