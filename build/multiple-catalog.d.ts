import { Catalog, CatalogMessages, CatalogStatus } from './catalog';
export declare class MultipleCatalog implements Catalog {
    private _locale;
    catalogs: Catalog[];
    status: CatalogStatus;
    constructor(locale: string);
    addCatalog(catalog: Catalog): void;
    getCatalogsByDomain(domain: string): Catalog[];
    get locale(): string;
    get messages(): CatalogMessages;
    get domains(): string[];
    hasDomain(domain: string): boolean;
    prepare(): void;
    private refreshStatus;
}
