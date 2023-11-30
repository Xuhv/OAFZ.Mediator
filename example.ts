import { createEmitter, CmdType } from './main.js';

const emitter = createEmitter<string, string>(CmdType.Request, msg => console.log('send:', msg));

console.log('subscribing...');
const unsubscribe = emitter.sub(({ payload }) => {
  return `[result ${payload}]`;
});

let counter = 0;

const interval = setInterval(async () => {
  const result = await emitter.send(`[event ${++counter}]`);
  console.log('received:', result);
  if (counter > 4) {
    unsubscribe();
    console.log('unsubscribed');
    clearInterval(interval);
  }
}, 1000);
