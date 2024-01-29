import { navigateRequester } from '@oafz/mediator-react/plugins/NavigatePlugin';
import { Paginate } from '../components/Paginate';
import { Filter, createFilterItem } from '../components/Filter';
import { Dataview } from '../components/DataView';
import { Button } from '@fluentui/react-components';

export function Page2() {
  return (
    <>
      <Button onClick={() => navigateRequester.send('/page1')} children={'nav to page 1'} appearance="transparent" />

      <Filter<FilterType>
        items={[
          createFilterItem<FilterType>({ fieldId: 'a' }),
          createFilterItem<FilterType>({ fieldId: 'b' }),
          createFilterItem<FilterType>({ fieldId: 'c' }),
          createFilterItem<FilterType>({ fieldId: 'd' }),
          createFilterItem<FilterType>({ fieldId: 'e' })
        ]}
      />
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

type FilterType = { a: string; b: number; c: string; d: number; e: string };

type Data = { id: number; a: string; b: number };
