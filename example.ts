import { createRequestEmitter, createNotificationEmitter } from "./main.ts";

// request can only has one handler

const requester1 = createRequestEmitter<{ name: string }, { ok: boolean }>();

requester1.receive(async (cmd) => {
  console.log("rec1", cmd);
  return { ok: true };
});

requester1.send({ name: "test1" });

requester1.receive(async (cmd) => {
  console.log("rec2", cmd);
  return { ok: true };
});

requester1.send({ name: "test2" });

// a logger and klassName name can be set

const requester2 = createRequestEmitter<{ name: string }, { ok: boolean }>({
  name: "test",
  logger: async (cmd) => {
    console.log("log", cmd);
  },
});

requester2.receive(async (cmd) => {
  return { ok: true };
});

// request has result

console.log("request result:", await requester2.send({ name: "test result" }));

// notification can have multiple handlers but no result

const notifier = createNotificationEmitter<{ name: string }>({
  name: "test notification",
  async logger(cmd) {
    console.log("log notification", cmd);
  },
});

notifier.receive(async (cmd) => {
  console.log("rec1 notification", cmd);
});
notifier.receive(async (cmd) => {
  console.log("rec2 notification", cmd);
});

console.log("notification result:", await notifier.send({ name: "test notification" }));
