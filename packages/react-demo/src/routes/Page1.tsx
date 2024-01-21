import { useEffect, useState } from 'react';
import { changeQueryRequester, queryChangedNotifier } from '@oafz/mediator-react/plugins/SearchChangePlugin';
import { useNavigate } from 'react-router-dom';

export function Page1() {
  const [data, setData] = useState<object>({});
  const nav = useNavigate();

  useEffect(() => {
    return queryChangedNotifier.receive(async ({ payload }) => {
      setData(payload);
    });
  }, [data, setData]);

  return (
    <>
      <h1>{JSON.stringify(data)}</h1>
      <button onClick={() => nav('/page2?foo=bar', { replace: true })}>nav to page 2</button>
      <button
        onClick={() =>
          changeQueryRequester.send({
            query: { xxx: 'xxx' },
            mode: 'merge'
          })
        }
      >
        merge query
      </button>
      <button
        onClick={() =>
          changeQueryRequester.send({
            query: { xxx: 'xxx' }
          })
        }
      >
        replace query
      </button>
      <button
        onClick={() =>
          changeQueryRequester.send({
            query: { xxx: 'xxx' },
            force: true
          })
        }
      >
        replace query force
      </button>
    </>
  );
}
