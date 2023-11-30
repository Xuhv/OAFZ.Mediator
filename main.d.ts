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
export declare enum CmdType {
    /** With this type, you can register only one handler for a command. */
    Request = 0,
    /** With this type, you can register only many handlers for a command, and there will be no response */
    Notification = 1
}
declare class Emitter<T, R> {
    private mediator;
    private logger;
    private cmdType;
    constructor(cmdType: CmdType, logger?: (msg: ICmd<T, R>) => void);
    send(payload: T): R | Promise<R>;
    sub(handle: R extends {} ? IRequestHandler<IRequest<T, R>>['handle'] : INotificationHandler<INotification<T>>['handle']): () => void;
}
export declare const createEmitter: {
    <T, R>(cmdType?: CmdType.Request, logger?: (msg: ICmd<T, R>) => void): Emitter<T, R>;
    <T>(cmdType: CmdType.Notification, logger?: (msg: ICmd<T, void>) => void): Emitter<T, void>;
};
export {};
