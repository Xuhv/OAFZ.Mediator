import { ReactNode, useEffect, useRef, useState } from 'react';
import { QueryState, queryChangedNotifier } from '../plugins/SearchChangePlugin';

export interface ODataViewProps<T> {
  dataResolver: (query: QueryState) => Promise<T[]>;
  render: (records: T[], reload: () => void) => ReactNode;
}

/**
 * The component depends on SearchParamsPlugin.
 * @param props
 * @returns
 */
export function ODataView<T>(props: ODataViewProps<T>) {
  const [records, setRecords] = useState<T[]>([]);
  const queryRef = useRef<QueryState>({});
  const reload = () => {
    queryChangedNotifier.send(queryRef.current);
  };

  useEffect(() => {
    queryChangedNotifier.receive(async ({ payload }) => {
      setRecords(await props.dataResolver(payload));
      queryRef.current = payload;
    });
  }, [props.dataResolver, setRecords, queryRef]);

  return props.render(records, reload);
}
