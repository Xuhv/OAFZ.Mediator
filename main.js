export var CmdType;
(function (CmdType) {
    /** With this type, you can register only one handler for a command. */
    CmdType[CmdType["Request"] = 0] = "Request";
    /** With this type, you can register only many handlers for a command, and there will be no response */
    CmdType[CmdType["Notification"] = 1] = "Notification";
})(CmdType || (CmdType = {}));
const isRequestCmd = (cmd) => cmd.type === CmdType.Request;
class Mediator {
    messages = new Map();
    send(cmd) {
        const cmdType = cmd.constructor;
        if (isRequestCmd(cmdType)) {
            const handler = this.messages.get(cmdType);
            return handler?.handle(cmd);
        }
        const handler = this.messages.get(cmdType);
        return handler?.handle(cmd);
    }
    sub(handler) {
        const cmdType = handler.cmdType;
        if (isRequestCmd(cmdType)) {
            this.messages.set(cmdType, handler);
        }
        else {
            if (this.messages.has(cmdType)) {
                this.messages.get(cmdType).push(handler);
            }
            else {
                this.messages.set(cmdType, [handler]);
            }
        }
    }
    unsub(handler) {
        if (isRequestCmd(handler.cmdType)) {
            this.messages.delete(handler.cmdType);
        }
        else {
            const handlers = this.messages.get(handler.cmdType);
            if (handlers?.length > 1) {
                handlers.splice(handlers.indexOf(handler), 1);
            }
            else {
                this.messages.delete(handler.cmdType);
            }
        }
    }
}
const mediator = new Mediator();
class Emitter {
    mediator = mediator;
    logger;
    cmdType;
    constructor(cmdType, logger) {
        this.logger = logger;
        this.cmdType =
            cmdType === CmdType.Request
                ? class {
                    static type = CmdType.Request;
                    payload;
                    constructor(payload) {
                        this.payload = payload;
                    }
                }
                : class {
                    static type = CmdType.Notification;
                    payload;
                    constructor(payload) {
                        this.payload = payload;
                    }
                };
    }
    send(payload) {
        this.logger?.({ payload });
        return this.mediator.send(new this.cmdType(payload));
    }
    sub(handle) {
        const handler = { cmdType: this.cmdType, handle };
        this.mediator.sub(handler);
        return () => this.mediator.unsub(handler);
    }
}
export const createEmitter = (cmdType = CmdType.Request, logger) => new Emitter(cmdType, logger);
