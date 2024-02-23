type Cmd = IRequest | INotification;

export interface IRequest<Payload = unknown, _Result = unknown> {
  klass: IRequestKlass;
  payload: Payload;
}

export interface INotification<Payload = unknown> {
  klass: INotificationKlass;
  payload: Payload;
}

type Klass = IRequestKlass | INotificationKlass;

type IRequestKlass<Payload = unknown, Result = unknown> = {
  new (payload: Payload): IRequest<Payload, Result>;
  type: 'request';
  klassName?: string;
};

type INotificationKlass<Payload = unknown> = {
  new (payload: Payload): INotification;
  type: 'notification';
  klassName?: string;
};

type IHandler<Cmd extends IRequest | INotification = IRequest | INotification> = {
  event: Cmd extends IRequest ? IRequestKlass : INotificationKlass;
  handle: (cmd: Cmd) => Promise<Cmd extends IRequest<infer _, infer Result> ? Result : void>;
};

interface TypedMap extends Map<Klass, IHandler<IRequest> | IHandler<INotification>[]> {
  get<K>(
    key: K
  ): typeof key extends IRequestKlass ? IHandler<IRequest> | undefined : IHandler<INotification>[] | undefined;
}

type CmdEmitterOptions<C extends Cmd = Cmd> = { multiple?: boolean; name?: string; logger?: (cmd: C) => Promise<void> };

const klassFactory = {
  createRequestKlass: (name?: string) => {
    const klass = class {
      static type = 'request';
      static klassName = name;
      payload: unknown;
      klass: IRequestKlass;
      constructor(payload: unknown) {
        this.payload = payload;
        this.klass = klass;
      }
    } as IRequestKlass;
    return klass;
  },
  createNotificationKlass: (name?: string) => {
    const klass = class {
      static type = 'notification';
      static klassName = name;
      payload: unknown;
      klass: INotificationKlass;
      constructor(payload: unknown) {
        this.payload = payload;
        this.klass = klass;
      }
    } as INotificationKlass;
    return klass;
  }
};

const isRequestKlass = (klass: Klass): klass is IRequestKlass => klass.type === 'request';

const isRequest = (cmd: Cmd): cmd is IRequest => isRequestKlass(cmd.klass);

const isRequestHandler = (handler: IHandler<IRequest> | IHandler<INotification>): handler is IHandler<IRequest> =>
  isRequestKlass(handler.event);

class Mediator {
  static instance = new Mediator();

  constructor() {
    return Mediator.instance;
  }

  private bus: TypedMap = new Map();

  async pub(cmd: Cmd) {
    if (isRequest(cmd)) {
      return this.bus.get(cmd.klass)?.handle(cmd);
    } else {
      const tasks = this.bus.get(cmd.klass)?.map(handler => handler.handle(cmd));
      if (tasks) {
        await Promise.all(tasks);
      }
    }
  }

  sub(handler: IHandler<IRequest> | IHandler<INotification>) {
    if (isRequestHandler(handler)) {
      this.bus.set(handler.event, handler);
    } else {
      if (!this.bus.has(handler.event)) {
        this.bus.set(handler.event, []);
      }
      this.bus.get(handler.event)!.push(handler);
    }
  }

  unsub(handler: IHandler<IRequest> | IHandler<INotification>) {
    if (isRequestHandler(handler)) {
      this.bus.delete(handler.event);
    }
    if (!isRequestHandler(handler)) {
      if (this.bus.has(handler.event)) {
        this.bus.get(handler.event)!.splice(this.bus.get(handler.event)!.indexOf(handler), 1);
      }
    }
  }
}

class CmdEmitter<C extends Cmd> {
  private mediator = new Mediator();
  private logger?: (cmd: C) => Promise<void>;
  klass: Klass;
  constructor(options?: CmdEmitterOptions<C>) {
    this.klass = options?.multiple
      ? klassFactory.createNotificationKlass(options.name)
      : klassFactory.createRequestKlass(options?.name);
    this.logger = options?.logger;
  }

  async send(payload: C['payload']) {
    const cmd = new this.klass(payload) as C;
    this.logger?.(cmd);
    return this.mediator.pub(cmd);
  }

  receive(handle: (cmd: C) => ReturnType<IHandler<C>['handle']>) {
    const handler = { event: this.klass, handle } as IHandler;
    this.mediator.sub(handler);
    return () => this.mediator.unsub(handler);
  }
}

export const createRequestEmitter = <P = unknown, R = unknown>(
  options?: Omit<CmdEmitterOptions<IRequest<P, R>>, 'multiple'>
) => new CmdEmitter<IRequest<P, R>>({ ...options, multiple: false });
export const createNotificationEmitter = <P = unknown>(
  options?: Omit<CmdEmitterOptions<INotification<P>>, 'multiple'>
) => new CmdEmitter<INotification<P>>({ ...options, multiple: true });

export const mergeReceiver =
  (...fns: Array<CallableFunction>) =>
  () =>
    fns.forEach(fn => fn());
