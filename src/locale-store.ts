import { observable, action, computed, when, observe } from 'mobx'
import { Catalog, CatalogMessages, CatalogStatus } from './catalog'
import { MultipleCatalog } from './multiple-catalog'

export class LocaleStore {
    @observable status: CatalogStatus = 'waiting'

    @observable locale: string = ''
    @observable messages: CatalogMessages = {}

    catalogs: MultipleCatalog[] = []

    constructor (locales: string[]) {
        for (const locale of locales) {
            if (this.getCatalog(locale) === null) {
                this.catalogs.push(new MultipleCatalog(locale))
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

    getCatalog (locale: string): MultipleCatalog | null {
        for (const catalog of this.catalogs) {
            if (catalog.locale === locale) {
                return catalog
            }
        }

        return null
    }

    getCatalogsByDomain (domain: string): Catalog[] {
        const mc = this.getCatalog(this.locale)
        if (mc) {
            return mc.getCatalogsByDomain(domain)
        }

        return []
    }

    @computed
    get domains (): string[] {
        const mc = this.getCatalog(this.locale)
        if (mc) {
            return mc.domains
        }

        return []
    }
}
