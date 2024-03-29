import { Outlet, createBrowserRouter } from 'react-router-dom';
import { SearchParamsPlugin } from '@oafz/mediator-react/plugins/SearchChangePlugin';
import { NavigatePlugin } from '@oafz/mediator-react/plugins/NavigatePlugin';
import { DefaultPagePlugin } from '@oafz/mediator-react/plugins/DefaultPagePlugin';
import { Page1 } from './Page1';
import { Page2 } from './Page2';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <SearchParamsPlugin />
        <NavigatePlugin />
        <DefaultPagePlugin defaultPage="/page1" />
        <Outlet />
      </>
    ),
    children: [
      {
        path: 'page1',
        element: <Page1 />
      },
      {
        path: 'page2',
        element: <Page2 />
      }
    ]
  }
]);
