import { Catalog, CatalogMessages, CatalogStatus } from './catalog'
import { observable, when, computed } from 'mobx'

export class MultipleCatalog implements Catalog {
    private _locale: string
    private _catalogs: Catalog[] = []
    @observable status: CatalogStatus = 'waiting'

    constructor (locale: string) {
        this._locale = locale
    }

    addCatalog (catalog: Catalog) {
        if (catalog.locale === this._locale) {
            this._catalogs.push(catalog)

            this.refreshStatus()
            when(() => catalog.status === 'ready', () => {
                this.refreshStatus()
            })
        }
    }

    getCatalogsByDomain (domain: string): Catalog[] {
        const catalogs: Catalog[] = []

        for (const catalog of this._catalogs) {
            if (catalog.hasDomain(domain)) {
                catalogs.push(catalog)
            }
        }

        return catalogs
    }

    get locale () {
        return this._locale
    }

    get messages () {
        let messages: CatalogMessages = {}

        for (const catalog of this._catalogs) {
            messages = { ...messages, ...catalog.messages }
        }

        return messages
    }

    @computed
    get domains (): string[] {
        let domains: string[] = []

        for (const catalog of this._catalogs) {
            domains = domains.concat(catalog.domains)
        }

        return domains
    }

    hasDomain (domain: string): boolean {
        return this.domains.indexOf(domain) >= 0
    }

    prepare () {
        this.status = 'updating'

        if (this._catalogs.length) {
            for (const catalog of this._catalogs) {
                catalog.prepare()
            }
        } else {
            this.status = 'ready'
        }

    }

    private refreshStatus () {
        for (const catalog of this._catalogs) {
            if (catalog.status === 'waiting' || catalog.status === 'updating') {
                this.status = catalog.status
                return
            }
        }

        this.status = 'ready'
    }
}
