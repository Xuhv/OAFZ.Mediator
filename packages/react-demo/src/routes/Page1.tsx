import { navigateRequester } from '@oafz/mediator-react/plugins/NavigatePlugin';
import { Button } from '@fluentui/react-components';

export function Page1() {
  return (
    <Button onClick={() => navigateRequester.send('/page2')} children={'nav to page 2'} appearance="transparent" />
  );
}
