import { ForwardedRef, ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import { QueryState, queryChangedNotifier } from '../plugins/SearchChangePlugin';
import { isFunction } from 'lodash-es';

declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
  ): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}

export interface DataViewProps<T> {
  dataResolver: (query: QueryState) => Promise<T[]>;
  render: (records: T[]) => ReactNode;
}

/**
 * The component depends on SearchParamsPlugin.
 * @param props
 * @param ref it contains a function to reload data
 * @returns
 */
export const DataView = forwardRef(function DataView<T>(props: DataViewProps<T>, ref: ForwardedRef<(() => void) | undefined>) {
  const [records, setRecords] = useState<T[]>([]);
  const queryRef = useRef<QueryState>({});
  const reload = () => {
    queryChangedNotifier.send(queryRef.current);
  };

  if (ref) {
    if (isFunction(ref)) ref(reload);
    else ref.current = reload;
  }

  useEffect(() => {
    queryChangedNotifier.receive(async ({ payload }) => {
      setRecords(await props.dataResolver(payload));
      queryRef.current = payload;
    });
  }, [props.dataResolver, setRecords, queryRef]);

  return props.render(records);
});
