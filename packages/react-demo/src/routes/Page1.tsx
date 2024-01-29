import { useEffect, useState } from 'react';
import { queryChangedNotifier } from '@oafz/mediator-react/plugins/SearchChangePlugin';
import { navigateRequester } from '@oafz/mediator-react/plugins/NavigatePlugin';
import { Button } from '@fluentui/react-components';

export function Page1() {
  const [data, setData] = useState<object>({});

  useEffect(() => {
    return queryChangedNotifier.receive(async ({ payload }) => {
      setData(payload);
    });
  }, [data, setData]);

  return (
    <Button onClick={() => navigateRequester.send('/page2')} children={'nav to page 2'} appearance='transparent' />
  );
}
