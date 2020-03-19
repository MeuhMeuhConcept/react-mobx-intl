import { Catalog, CatalogMessages, CatalogStatus } from './catalog'

export default class SimpleCatalog implements Catalog {
    private _locale: string
    private _messages: CatalogMessages
    private _status: CatalogStatus = 'waiting'

    constructor (locale: string, messages: CatalogMessages) {
        this._locale = locale
        this._messages = messages
    }

    get locale () {
        return this._locale
    }

    get messages () {
        return this._messages
    }

    get status (): CatalogStatus {
        return this._status
    }

    prepare () {
        this._status = 'ready'
    }
}
