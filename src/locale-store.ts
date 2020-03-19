import { observable, action, computed, when, observe } from 'mobx'
import { Catalog, CatalogMessages, CatalogStatus } from './catalog'
import MultiCatalog from './multiple-catalog'

export default class LocaleStore {
    @observable status: CatalogStatus = 'waiting'

    @observable locale: string = ''
    @observable messages: CatalogMessages = {}

    catalogs: MultiCatalog[] = []

    constructor (locales: string[]) {
        for (const locale of locales) {
            if (this.getCatalog(locale) === null) {
                this.catalogs.push(new MultiCatalog(locale))
            }
        }
    }

    @action addCatalog (catalog: Catalog) {
        const mc = this.getCatalog(catalog.locale)
        if (mc) {
            mc.addCatalog(catalog)
        }
    }

    @action changeLocale (locale: string) {
        const catalog = this.getCatalog(locale)

        if (!catalog) {
            return
        }

        this.status = 'updating'

        if (catalog.status !== 'ready') {
            when(() => catalog.status === 'ready', () => {
                this.changeCurrentCatalog(catalog)
            })

            catalog.prepare()

            return
        }

        this.changeCurrentCatalog(catalog)
    }

    @action.bound
    private changeCurrentCatalog (catalog: Catalog) {
        this.locale = catalog.locale
        this.messages = catalog.messages
        this.status = 'ready'

        when(() => catalog.status !== 'ready', () => {
            this.changeLocale(catalog.locale)
        })
    }

    getCatalog (locale: string): MultiCatalog | null {
        for (const catalog of this.catalogs) {
            if (catalog.locale === locale) {
                return catalog
            }
        }

        return null
    }
}
