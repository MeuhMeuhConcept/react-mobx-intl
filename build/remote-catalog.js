"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_mobx_loader_1 = require("react-mobx-loader");
const mobx_1 = require("mobx");
class RemoteCatalog {
    constructor(locale, url) {
        this._messages = {};
        this._locale = locale;
        this._loader = new react_mobx_loader_1.SimpleLoader(url, false);
        mobx_1.when(() => this._loader.status === 'done', () => {
            this._messages = this._loader.responseData;
        });
    }
    get locale() {
        return this._locale;
    }
    get status() {
        switch (this._loader.status) {
            case 'waiting':
                return 'waiting';
            case 'pending':
                return 'updating';
            default:
                return 'ready';
        }
    }
    get messages() {
        if (this._messages) {
            return this._messages;
        }
        return {};
    }
    prepare() {
        if (this._loader.status === 'waiting') {
            this._loader.load();
        }
    }
}
exports.RemoteCatalog = RemoteCatalog;
