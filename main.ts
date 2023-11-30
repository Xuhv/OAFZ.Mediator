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

export enum CmdType {
  /** With this type, you can register only one handler for a command. */
  Request = 0,
  /** With this type, you can register only many handlers for a command, and there will be no response */
  Notification = 1
}

const isRequestCmd = <T, R>(cmd: IRequestType<T, R> | INotificationType<T>): cmd is IRequestType<T, R> =>
  cmd.type === CmdType.Request;

class Mediator {
  private messages: Map<IRequestType | INotificationType, IRequestHandler | INotificationHandler[]> = new Map();

  send<T, R>(cmd: IRequest<T, R>): R | Promise<R>;
  send<T, R>(cmd: INotification<T>): void | Promise<void>;
  send<T, R>(cmd: IRequest<T, R> | INotification<T>) {
    const cmdType = cmd.constructor as IRequestType | INotificationType;

    if (isRequestCmd(cmdType)) {
      const handler = this.messages.get(cmdType) as IRequestHandler<IRequest<T, R>> | undefined;
      return (handler as IRequestHandler<typeof cmd>)?.handle(cmd);
    }

    const handler = this.messages.get(cmdType) as INotificationHandler<INotification<T>> | undefined;
    return (handler as INotificationHandler<typeof cmd>)?.handle(cmd);
  }

  sub<T, R>(handler: IRequestHandler<IRequest<T, R>> | INotificationHandler<INotification<T>>) {
    const cmdType = handler.cmdType as IRequestType | INotificationType;

    if (isRequestCmd(cmdType)) {
      this.messages.set(cmdType, handler as IRequestHandler<IRequest<T, R>>);
    } else {
      if (this.messages.has(cmdType)) {
        (this.messages.get(cmdType) as INotificationHandler<INotification<T>>[]).push(
          handler as INotificationHandler<INotification<T>>
        );
      } else {
        this.messages.set(cmdType, [handler as INotificationHandler<INotification<T>>]);
      }
    }
  }

  unsub(handler: IRequestHandler<IRequest<unknown, unknown>> | INotificationHandler<INotification<unknown>>) {
    if (isRequestCmd(handler.cmdType)) {
      this.messages.delete(handler.cmdType);
    } else {
      const handlers = this.messages.get(handler.cmdType) as INotificationHandler<INotification<unknown>>[];
      if (handlers?.length > 1) {
        handlers.splice(handlers.indexOf(handler as INotificationHandler<INotification<unknown>>), 1);
      } else {
        this.messages.delete(handler.cmdType);
      }
    }
  }
}

const mediator = new Mediator();

class Emitter<T, R> {
  private mediator = mediator;
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
    const handler = { cmdType: this.cmdType, handle };

    this.mediator.sub(handler as Parameters<Mediator['sub']>[0]);
    return () => this.mediator.unsub(handler as Parameters<Mediator['unsub']>[0]);
  }
}

export const createEmitter: {
  <T, R>(cmdType?: CmdType.Request, logger?: (msg: ICmd<T, R>) => void): Emitter<T, R>;
  <T>(cmdType: CmdType.Notification, logger?: (msg: ICmd<T, void>) => void): Emitter<T, void>;
} = <T, R>(cmdType: CmdType = CmdType.Request, logger?: (msg: ICmd<T, R>) => void) =>
  new Emitter<T, R>(cmdType, logger);
