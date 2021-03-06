"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractCatalog {
    constructor(locale, domains = ['default']) {
        this._locale = locale;
        this._domains = domains;
    }
    get locale() {
        return this._locale;
    }
    get domains() {
        return this._domains;
    }
    hasDomain(domain) {
        return this.domains.indexOf(domain) >= 0;
    }
}
exports.AbstractCatalog = AbstractCatalog;
