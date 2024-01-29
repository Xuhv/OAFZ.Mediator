import { Button, Field, Input, makeStyles, shorthands } from '@fluentui/react-components';
import { Search24Regular, ArrowReset24Regular, CaretDown24Filled, CaretUp24Filled } from '@fluentui/react-icons';
import { FilterProps, ItemProps, Filter as OFilter } from '@oafz/mediator-react/components/Filter';
import { FieldValues } from 'react-hook-form';

declare module 'react' {
  interface CSSProperties {
    // Allow any CSS Custom Properties
    [index: `--${string}`]: any;
  }
}

export function createFilterItem<T extends FieldValues>(props: ItemProps<T>) {
  if (!props.render) {
    props.render = ({ field, fieldState: { error } }) => (
      <Field
        label={props.fieldId}
        validationMessage={error?.message}
        orientation="horizontal"
        style={{ display: 'unset' }}
      >
        <Input {...field} />
      </Field>
    );
  }

  return props;
}

export function createFilterItems<T extends FieldValues>(items: ItemProps<T>[]) {
  return items.map(createFilterItem);
}

const useStyles = makeStyles({
  root: {
    display: 'grid',
    ...shorthands.gap('8px'),
    gridTemplateColumns: `repeat(var(--limit), auto)`,
    justifyContent: 'space-between'
  },
  buttonGroup: {
    gridColumnEnd: -1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    ...shorthands.gap('8px', '0')
  },
  expandOrCollapseButton: {
    minWidth: 'unset',
    ...shorthands.padding('0')
  }
});

export function Filter<T extends FieldValues>({ items }: Pick<FilterProps<T>, 'items'>) {
  const styles = useStyles();
  const limit = 3;

  return (
    <OFilter<T>
      className={styles.root}
      style={{ '--limit': limit }}
      items={items}
      limit={limit}
      submitButton={<Button appearance="primary" icon={<Search24Regular />} />}
      resetButton={<Button icon={<ArrowReset24Regular />} />}
      expandButton={
        <Button
          appearance="transparent"
          icon={<CaretDown24Filled />}
          iconPosition="after"
          children="More"
          className={styles.expandOrCollapseButton}
        />
      }
      collapseButton={
        <Button
          appearance="transparent"
          icon={<CaretUp24Filled />}
          iconPosition="after"
          children="Less"
          className={styles.expandOrCollapseButton}
        />
      }
      buttonGroupClassName={styles.buttonGroup}
    />
  );
}
