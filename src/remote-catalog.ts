import { Catalog, CatalogStatus } from './catalog'
import { JsonLoader } from 'react-mobx-loader'
import { when } from 'mobx'

export class RemoteCatalog implements Catalog {
    private _locale: string
    private _messages: {[key: string]: string} = {}
    private _loader: JsonLoader

    constructor (locale: string, url: string) {
        this._locale = locale
        this._loader = new JsonLoader(url, false)

        when(() => this._loader.status === 'done', () => {
            this._messages = this._loader.responseData
        })
    }

    get locale () {
        return this._locale
    }

    get status (): CatalogStatus {
        switch (this._loader.status) {
        case 'waiting':
            return 'waiting'
        case 'pending':
            return 'updating'
        default:
            return 'ready'
        }
    }

    get messages () {

        if (this._messages) {
            return this._messages
        }

        return {}
    }

    prepare () {
        if (this._loader.status === 'waiting') {
            this._loader.load()
        }
    }
}
