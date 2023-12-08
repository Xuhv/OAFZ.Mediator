import { createEmitter, CmdType, mergeRegister } from './main.ts';

/* --------------------------------- Request -------------------------------- */

const emitter1 = createEmitter<string, string>(CmdType.Request, msg => console.log('send:', msg.payload));

console.log('emitter1 subscribing...');
const unsubscribe = emitter1.sub(({ payload }) => {
  console.log(`emitter1 exec ${payload}`);
  return `[result ${payload}]`;
});

let counter = 0;

setTimeout(async () => {
  const result = await emitter1.send(`[event ${++counter}]`);
  console.log('result:', result);
  unsubscribe();
  console.log('emitter1 unsubscribed');
}, 1000);

/* ------------------------------ Notification ------------------------------ */

const emitter2 = createEmitter<string>(CmdType.Notification, msg => console.log('send:', msg.payload));

console.log('emitter2 subscribing...');
const unsubscribe2 = mergeRegister(
  emitter2.sub(async ({ payload }) => {
    return Promise.resolve().then(() => {
      console.log(`handler2.1 exec ${payload}`);
    });
  }),
  emitter2.sub(({ payload }) => {
    console.log(`handler2.2 exec ${payload}`);
  })
);

setTimeout(async () => {
  await emitter2.send(`[event ${++counter}]`);
  unsubscribe2();
  console.log('emitter2 unsubscribed');
}, 1000);
