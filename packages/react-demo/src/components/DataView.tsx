import {
  CreateTableColumnOptions,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridProps,
  DataGridRow,
  createTableColumn
} from '@fluentui/react-components';
import { DataView as ODataView, DataViewProps as ODataViewProps } from '@oafz/mediator-react/components/DataView';
import { omit } from 'lodash-es';
import { useRef } from 'react';

type RowData = { [k: string]: any };

interface CreateTableColumnOptionsX<T extends RowData>
  extends Partial<Omit<CreateTableColumnOptions<T>, 'renderCell' | 'columnId'>> {
  columnId: keyof T | 'action';
  renderCell?: (item: T, reload?: () => void) => React.ReactNode;
}

type DataviewProps<T extends RowData> = Omit<DataGridProps, 'items' | 'columns'> & {
  dataResolver: ODataViewProps<T>['dataResolver'];
  columns: CreateTableColumnOptionsX<T>[];
};

export function Dataview<T extends RowData>(props: DataviewProps<T>) {
  const dataGridProps = omit(props, 'dataResolver');
  const reloadRef = useRef<() => void | undefined>();

  const columns = props.columns.map(column => {
    if (!column.renderHeaderCell) {
      column.renderHeaderCell = () => column.columnId as string;
    }
    if (!column.renderCell) {
      column.renderCell = item => item[column.columnId] as any;
    }
    return createTableColumn<T>(column as CreateTableColumnOptions<T>);
  });

  return (
    <ODataView
      ref={reloadRef}
      dataResolver={props.dataResolver}
      render={records => (
        <DataGrid {...dataGridProps} items={records} columns={columns}>
          <DataGridHeader>
            <DataGridRow>{({ renderHeaderCell }) => <DataGridHeaderCell children={renderHeaderCell()} />}</DataGridRow>
          </DataGridHeader>
          <DataGridBody<T>>
            {({ item }) => (
              <DataGridRow>
                {({ renderCell }) => (
                  <DataGridCell>
                    {(renderCell as CreateTableColumnOptionsX<T>['renderCell'])?.(item, reloadRef.current)}
                  </DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      )}
    />
  );
}
