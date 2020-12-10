import { Catalog, CatalogMessages, CatalogStatus } from './catalog';
import { MultipleCatalog } from './multiple-catalog';
export declare class LocaleStore {
    status: CatalogStatus;
    locale: string;
    messages: CatalogMessages;
    catalogs: MultipleCatalog[];
    activeDomains: string[];
    constructor(locales: string[]);
    addCatalog(catalog: Catalog): void;
    changeLocale(locale: string): void;
    private changeCurrentCatalog;
    getCatalog(locale: string): MultipleCatalog | null;
    getCatalogsByDomain(domain: string): Catalog[];
    get domains(): string[];
    hasDomain(domain: string): boolean;
    refreshActiveDomains(): void;
    hasActiveDomain(domain: string): boolean;
}
