import { Catalog, CatalogMessages, CatalogStatus } from './catalog'
import { observable, when, computed, action } from 'mobx'

export class MultipleCatalog implements Catalog {
    private _locale: string
    @observable catalogs: Catalog[] = []
    @observable status: CatalogStatus = 'waiting'

    constructor (locale: string) {
        this._locale = locale
    }

    @action
    addCatalog (catalog: Catalog) {
        if (catalog.locale === this._locale) {
            this.catalogs.push(catalog)

            this.refreshStatus()
            when(() => catalog.status === 'ready', () => {
                this.refreshStatus()
            })

            if (this.status !== 'waiting') {
                catalog.prepare()
            }
        }
    }

    getCatalogsByDomain (domain: string): Catalog[] {
        const catalogs: Catalog[] = []

        for (const catalog of this.catalogs) {
            if (catalog.hasDomain(domain)) {
                catalogs.push(catalog)
            }
        }

        return catalogs
    }

    get locale () {
        return this._locale
    }

    @computed
    get messages () {
        let messages: CatalogMessages = {}

        for (const catalog of this.catalogs) {
            messages = { ...messages, ...catalog.messages }
        }

        return messages
    }

    @computed
    get domains (): string[] {
        let domains: string[] = []

        for (const catalog of this.catalogs) {
            domains = domains.concat(catalog.domains)
        }

        return domains
    }

    hasDomain (domain: string): boolean {
        return this.domains.indexOf(domain) >= 0
    }

    prepare () {
        this.status = 'updating'

        if (this.catalogs.length) {
            for (const catalog of this.catalogs) {
                catalog.prepare()
            }
        } else {
            this.status = 'ready'
        }

    }

    private refreshStatus () {
        for (const catalog of this.catalogs) {
            if (catalog.status === 'waiting' || catalog.status === 'updating') {
                this.status = catalog.status
                return
            }
        }

        this.status = 'ready'
    }
}
