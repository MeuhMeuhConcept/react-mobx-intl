"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_catalog_1 = require("./abstract-catalog");
class SimpleCatalog extends abstract_catalog_1.AbstractCatalog {
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
exports.SimpleCatalog = SimpleCatalog;
