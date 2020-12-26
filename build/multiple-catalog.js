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
        this.catalogs = [];
        this.status = 'waiting';
        this._locale = locale;
    }
    addCatalog(catalog) {
        if (catalog.locale === this._locale) {
            this.catalogs.push(catalog);
            this.refreshStatus();
            mobx_1.when(() => catalog.status === 'ready', () => {
                this.refreshStatus();
            });
            if (this.status !== 'waiting') {
                catalog.prepare();
            }
        }
    }
    getCatalogsByDomain(domain) {
        const catalogs = [];
        for (const catalog of this.catalogs) {
            if (catalog.hasDomain(domain)) {
                catalogs.push(catalog);
            }
        }
        return catalogs;
    }
    get locale() {
        return this._locale;
    }
    get messages() {
        let messages = {};
        for (const catalog of this.catalogs) {
            messages = { ...messages, ...catalog.messages };
        }
        return messages;
    }
    get domains() {
        let domains = [];
        for (const catalog of this.catalogs) {
            domains = domains.concat(catalog.domains);
        }
        return domains;
    }
    hasDomain(domain) {
        return this.domains.indexOf(domain) >= 0;
    }
    prepare() {
        this.status = 'updating';
        if (this.catalogs.length) {
            for (const catalog of this.catalogs) {
                catalog.prepare();
            }
        }
        else {
            this.status = 'ready';
        }
    }
    refreshStatus() {
        for (const catalog of this.catalogs) {
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
], MultipleCatalog.prototype, "catalogs", void 0);
__decorate([
    mobx_1.observable
], MultipleCatalog.prototype, "status", void 0);
__decorate([
    mobx_1.action
], MultipleCatalog.prototype, "addCatalog", null);
__decorate([
    mobx_1.computed
], MultipleCatalog.prototype, "messages", null);
__decorate([
    mobx_1.computed
], MultipleCatalog.prototype, "domains", null);
exports.MultipleCatalog = MultipleCatalog;
