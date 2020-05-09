import { AbstractCatalog } from './abstract-catalog';
export class SimpleCatalog extends AbstractCatalog {
    constructor(locale, messages, domains = ['default']) {
        super(locale, domains);
        this._status = 'waiting';
        this._messages = messages;
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
