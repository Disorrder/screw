type Subscriber = (...args: any[]) => void;
type Subscribers = {
    [name: string]: Subscriber[];
};

export default class EventEmitter {
    private _subscribers: Subscribers = {};

    on(name: string, cb: Subscriber, ctx?: any): this {
        if (!name || !cb) return this;
        if (!this._subscribers) this._subscribers = {};
        if (!this._subscribers[name]) this._subscribers[name] = [];
        if (ctx) cb = cb.bind(ctx);
        this._subscribers[name].push(cb);
        return this;
    }

    emit(name: string, ...args: any[]): this {
        if (!name || !this._subscribers || !this._subscribers[name]) return this;
        this._subscribers[name].forEach(cb => cb.apply(null, args));
        return this;
    }

    off(name: string, cb: Subscriber): this {
        if (!name) return this;
        if (cb) {
            let index = this._subscribers[name].indexOf(cb);
            if (~index) this._subscribers[name].splice(index, 1);
        } else {
            this._subscribers[name].length = 0;
        }
        return this;
    }
}
