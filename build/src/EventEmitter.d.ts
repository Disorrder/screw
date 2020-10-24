declare type Subscriber = (...args: any[]) => void;
export default class EventEmitter {
    private _subscribers;
    on(name: string, cb: Subscriber, ctx?: any): this;
    emit(name: string, ...args: any[]): this;
    off(name: string, cb: Subscriber): this;
}
export {};
