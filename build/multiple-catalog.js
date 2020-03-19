"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
class MultipleCatalog {
    constructor(locale) {
        this._catalogs = [];
        this.status = 'waiting';
        this._locale = locale;
    }
    addCatalog(catalog) {
        if (catalog.locale === this._locale) {
            this._catalogs.push(catalog);
            this.refreshStatus();
            mobx_1.when(() => catalog.status === 'ready', () => {
                this.refreshStatus();
            });
        }
    }
    get locale() {
        return this._locale;
    }
    get messages() {
        let messages = {};
        for (const catalog of this._catalogs) {
            messages = { ...messages, ...catalog.messages };
        }
        return messages;
    }
    prepare() {
        this.status = 'updating';
        if (this._catalogs.length) {
            for (const catalog of this._catalogs) {
                catalog.prepare();
            }
        }
        else {
            this.status = 'ready';
        }
    }
    refreshStatus() {
        for (const catalog of this._catalogs) {
            if (catalog.status === 'waiting' || catalog.status === 'updating') {
                this.status = catalog.status;
                return;
            }
        }
        this.status = 'ready';
    }
}
__decorate([
    mobx_1.observable
], MultipleCatalog.prototype, "status", void 0);
exports.MultipleCatalog = MultipleCatalog;
