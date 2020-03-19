export class SimpleCatalog {
    constructor(locale, messages) {
        this._status = 'waiting';
        this._locale = locale;
        this._messages = messages;
    }
    get locale() {
        return this._locale;
    }
    get messages() {
        return this._messages;
    }
    get status() {
        return this._status;
    }
    prepare() {
        this._status = 'ready';
    }
}
