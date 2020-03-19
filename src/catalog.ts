export interface CatalogMessages {
    [id: string]: string
}

export type CatalogStatus = 'waiting' | 'updating' | 'ready'

export interface Catalog {
    locale: string,
    messages: CatalogMessages,
    status: CatalogStatus,
    prepare (): void
}
