import { useEffect, useState } from 'react';
import { queryChangedNotifier } from '@oafz/mediator-react/plugins/SearchChangePlugin';
import { useNavigate } from 'react-router-dom';
import { Paginate } from '../components/Paginate';
import { Filter } from '../components/Filter';
import { Dataview } from '../components/DataView';

export function Page2() {
  const [data, setData] = useState<object>({});
  const nav = useNavigate();

  useEffect(() => {
    return queryChangedNotifier.receive(async ({ payload }) => {
      setData(payload);
    });
  }, [setData]);

  return (
    <>
      <h2>{JSON.stringify(data)}</h2>
      <button onClick={() => nav('/page1?foo=bar', { replace: true })}>nav to page 1</button>

      <Filter<FilterType> fields={[{ fieldId: 'a' }]} />
      <Dataview<Data>
        columns={[
          { columnId: 'id' },
          { columnId: 'a' },
          { columnId: 'b' },
          {
            columnId: 'action',
            renderCell(_, reload) {
              return <button onClick={reload}>reload</button>;
            }
          }
        ]}
        dataResolver={q =>
          Promise.resolve(
            Array.from({ length: 10 }, (_, i) => ({ id: i, a: (q.a as string) ?? '1', b: new Date().getTime() }))
          )
        }
      />
      <Paginate pageCount={10} />
    </>
  );
}

type FilterType = { a: string; b: number };

type Data = { id: number; a: string; b: number };
