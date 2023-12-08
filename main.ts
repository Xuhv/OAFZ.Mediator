interface ICmd<T, _> {
  readonly payload: T;
}

type IRequest<T = unknown, R = unknown> = ICmd<T, R>;

type IRequestType<T = unknown, R = unknown> = {
  new (payload: T): IRequest<T, R>;
  type: CmdType.Request;
};

type IRequestHandler<Cmd extends IRequest<unknown, unknown> = IRequest<unknown, unknown>> = {
  cmdType: IRequestType;
  handle(cmd: Cmd): Cmd extends IRequest<infer _T, infer R> ? R | Promise<R> : never;
};

type INotification<T> = ICmd<T, void>;

type INotificationType<T = unknown> = {
  new (payload: T): INotification<T>;
  type: CmdType.Notification;
};

type INotificationHandler<Cmd extends INotification<unknown> = INotification<unknown>> = {
  cmdType: INotificationType;
  handle(cmd: Cmd): void | Promise<void>;
};

interface TypedMap extends Map<IRequestType | INotificationType, IRequestHandler | INotificationHandler[]> {
  get(key: IRequestType): IRequestHandler | undefined;
  get(key: INotificationType): INotificationHandler[] | undefined;
  get(key: IRequestType | INotificationType): IRequestHandler | INotificationHandler[] | undefined;
}

export enum CmdType {
  /** With this type, you can register only one handler for a command. */
  Request = 0,
  /** With this type, you can register only many handlers for a command, and there will be no response */
  Notification = 1
}

const isRequestCmd = <T, R>(cmd: IRequestType<T, R> | INotificationType<T>): cmd is IRequestType<T, R> =>
  cmd.type === CmdType.Request;

const isRequestHandler = <T, R>(
  handler: IRequestHandler<IRequest<T, R>> | INotificationHandler<INotification<T>>
): handler is IRequestHandler<IRequest<T, R>> => isRequestCmd(handler.cmdType);

class Mediator {
  static instance = new Mediator();

  private messages: TypedMap = new Map();

  constructor() {
    return Mediator.instance;
  }

  send<T, R>(cmd: IRequest<T, R>): R | Promise<R>;
  send<T, R>(cmd: INotification<T>): void | Promise<void>;
  send<T, R>(cmd: IRequest<T, R> | INotification<T>) {
    const handlers = this.messages.get(cmd.constructor as IRequestType | INotificationType);
    if (Array.isArray(handlers)) {
      const tasks = handlers.map(handler => handler.handle(cmd));
      if (tasks.some(t => t instanceof Promise)) {
        return Promise.all(tasks);
      }
    } else return handlers?.handle(cmd);
  }

  sub<T, R>(handler: IRequestHandler<IRequest<T, R>> | INotificationHandler<INotification<T>>) {
    if (isRequestHandler(handler)) {
      this.messages.set(handler.cmdType, handler);
    } else {
      if (this.messages.has(handler.cmdType)) {
        this.messages.get(handler.cmdType)?.push(handler);
      } else {
        this.messages.set(handler.cmdType, [handler]);
      }
    }
  }

  unsub(handler: IRequestHandler<IRequest<unknown, unknown>> | INotificationHandler<INotification<unknown>>) {
    if (isRequestHandler(handler)) {
      this.messages.delete(handler.cmdType);
    } else {
      const handlers = this.messages.get(handler.cmdType);
      if (handlers && handlers.length > 1) {
        handlers.splice(handlers.indexOf(handler), 1);
      } else {
        this.messages.delete(handler.cmdType);
      }
    }
  }
}

class Emitter<T, R> {
  private mediator = new Mediator();
  private logger: ((msg: { payload: T }) => void) | undefined;
  private cmdType: IRequestType<T, R> | INotificationType<T>;

  constructor(cmdType: CmdType, logger?: (msg: ICmd<T, R>) => void) {
    this.logger = logger;
    this.cmdType =
      cmdType === CmdType.Request
        ? (class {
            static type: CmdType.Request = CmdType.Request;
            payload: T;
            constructor(payload: T) {
              this.payload = payload;
            }
          } as IRequestType<T, R>)
        : (class {
            static type: CmdType.Notification = CmdType.Notification;
            payload: T;
            constructor(payload: T) {
              this.payload = payload;
            }
          } as INotificationType<T>);
  }

  send(payload: T) {
    this.logger?.({ payload });
    return this.mediator.send(new this.cmdType(payload));
  }

  sub(
    handle: R extends {} ? IRequestHandler<IRequest<T, R>>['handle'] : INotificationHandler<INotification<T>>['handle']
  ): () => void {
    const handler = { cmdType: this.cmdType, handle } as R extends {}
      ? IRequestHandler<IRequest<T, R>>
      : INotificationHandler<INotification<T>>;

    this.mediator.sub(handler);
    return () => this.mediator.unsub(handler);
  }
}

export const createEmitter: {
  <T, R>(cmdType?: CmdType.Request, logger?: (msg: ICmd<T, R>) => void): Emitter<T, R>;
  <T>(cmdType: CmdType.Notification, logger?: (msg: ICmd<T, void>) => void): Emitter<T, void>;
} = <T, R>(cmdType: CmdType = CmdType.Request, logger?: (msg: ICmd<T, R>) => void) =>
  new Emitter<T, R>(cmdType, logger);

export const mergeRegister =
  (...unregisterList: (() => void)[]) =>
  () =>
    unregisterList.forEach(unregister => unregister());
