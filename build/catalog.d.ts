export interface CatalogMessages {
    [id: string]: string;
}
export declare type CatalogStatus = 'waiting' | 'updating' | 'ready';
export interface Catalog {
    locale: string;
    domains: string[];
    hasDomain(domain: string): boolean;
    messages: CatalogMessages;
    status: CatalogStatus;
    prepare(): void;
}
