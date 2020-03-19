import { Catalog, CatalogMessages, CatalogStatus } from './catalog'
import { observable, when } from 'mobx'

export default class MultipleCatalog implements Catalog {
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
