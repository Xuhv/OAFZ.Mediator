import { useEffect } from 'react';
import { useMatches } from 'react-router-dom';
import { navigateRequester } from './NavigatePlugin';

export const DefaultPagePlugin = ({ defaultPage }: { defaultPage: string }) => {
  const currentRoute = useMatches().at(-1)!;

  useEffect(() => {
    if (currentRoute.pathname === '/') navigateRequester.send({ path: defaultPage, options: { replace: true } });
  }, []);

  return null;
};
