# @oafz/mediator

A simple pub/sub library.

## NOTE ⚠

I only publish the source code which written in typescript. My tsconfig.json is [here](https://github.com/Xuhv/OAFZ.Mediator/blob/main/tsconfig.json).

## Usage

1. createRequestEmitter

It has only one subscriber.

```typescript
import { useEffect } from 'react';
import { NavigateOptions, Path, useNavigate } from 'react-router-dom';
import { createRequestEmitter } from '@oafz/mediator';

// only one parameter can be passed
export const navigateRequester = createRequestEmitter<
  | string
  | {
      path: string | Partial<Path>;
      options?: NavigateOptions;
    }
  | number,
  void
>({ name: 'navigate' });

export function NavigatePlugin() {
  const nav = useNavigate();

  useEffect(() => {
    // `receive` method returns a unsubscribe function.
    return navigateRequester.receive(async ({ payload }) => {
      if (typeof payload === 'object') nav(payload.path, payload.options);
      // @ts-expect-error
      else nav(payload);
    });
  }, [nav]);

  return null;
}

// the callback return nothing so it should be undefined.
const result = await navigateRequester.send("/")
```

2. createNotificationEmitter

It is similar to `createRequestEmitter`, but it's `receive` method returns an empty `Promise` and it can has many subscribers.

3. mergeReceiver

Wrap many unsubscribe functions into one.

```typescript
const notifier = createNotificationEmitter<{ name: string }>({ name: 'notification' });
const unsub = mergeReceiver(
    notifier.receive(async () => {}),
    notifier.receive(async () => {})
)
```
