"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const multiple_catalog_1 = __importDefault(require("./multiple-catalog"));
class LocaleStore {
    constructor(locales) {
        this.status = 'waiting';
        this.locale = '';
        this.messages = {};
        this.catalogs = [];
        for (const locale of locales) {
            if (this.getCatalog(locale) === null) {
                this.catalogs.push(new multiple_catalog_1.default(locale));
            }
        }
    }
    addCatalog(catalog) {
        const mc = this.getCatalog(catalog.locale);
        if (mc) {
            mc.addCatalog(catalog);
        }
    }
    changeLocale(locale) {
        const catalog = this.getCatalog(locale);
        if (!catalog) {
            return;
        }
        this.status = 'updating';
        if (catalog.status !== 'ready') {
            mobx_1.when(() => catalog.status === 'ready', () => {
                this.changeCurrentCatalog(catalog);
            });
            catalog.prepare();
            return;
        }
        this.changeCurrentCatalog(catalog);
    }
    changeCurrentCatalog(catalog) {
        this.locale = catalog.locale;
        this.messages = catalog.messages;
        this.status = 'ready';
        mobx_1.when(() => catalog.status !== 'ready', () => {
            this.changeLocale(catalog.locale);
        });
    }
    getCatalog(locale) {
        for (const catalog of this.catalogs) {
            if (catalog.locale === locale) {
                return catalog;
            }
        }
        return null;
    }
}
__decorate([
    mobx_1.observable
], LocaleStore.prototype, "status", void 0);
__decorate([
    mobx_1.observable
], LocaleStore.prototype, "locale", void 0);
__decorate([
    mobx_1.observable
], LocaleStore.prototype, "messages", void 0);
__decorate([
    mobx_1.action
], LocaleStore.prototype, "addCatalog", null);
__decorate([
    mobx_1.action
], LocaleStore.prototype, "changeLocale", null);
__decorate([
    mobx_1.action.bound
], LocaleStore.prototype, "changeCurrentCatalog", null);
exports.default = LocaleStore;
