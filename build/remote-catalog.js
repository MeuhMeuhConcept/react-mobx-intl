import { JsonLoader } from 'react-mobx-loader';
import { when } from 'mobx';
import { AbstractCatalog } from './abstract-catalog';
export class RemoteCatalog extends AbstractCatalog {
    constructor(locale, url, domains = ['default']) {
        super(locale, domains);
        this._messages = {};
        this._loader = new JsonLoader(url, false);
        when(() => this._loader.status === 'done', () => {
            this._messages = this._loader.responseData;
        });
    }
    get status() {
        switch (this._loader.status) {
            case 'waiting':
                return 'waiting';
            case 'pending':
                return 'updating';
            default:
                return 'ready';
        }
    }
    get messages() {
        if (this._messages) {
            return this._messages;
        }
        return {};
    }
    prepare() {
        if (this._loader.status === 'waiting') {
            this._loader.load();
        }
    }
}
