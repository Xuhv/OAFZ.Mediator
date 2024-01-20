import { useEffect } from 'react';
import { NavigateOptions, Path, useNavigate } from 'react-router-dom';
import { createRequestEmitter } from '../main.js';

export const navigateRequester = createRequestEmitter<
  | string
  | {
      toOrDelta: string | Partial<Path>;
      options?: NavigateOptions;
    }
  | number,
  void
>({ name: 'navigate' });

export function NavigatePlugin() {
  const nav = useNavigate();

  useEffect(() => {
    return navigateRequester.receive(async ({ payload }) => {
      if (typeof payload === 'object') nav(payload.toOrDelta, payload.options);
      // @ts-expect-error
      else nav(payload);
    });
  }, [nav]);

  return null;
}
