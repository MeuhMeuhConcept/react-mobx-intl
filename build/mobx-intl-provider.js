import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { CatalogAwaiter } from './catalog-awaiter';
export class MobxIntlProvider extends React.Component {
    render() {
        let { domain } = this.props;
        if (!domain) {
            domain = 'default';
        }
        return (React.createElement(IntlProvider, { locale: this.props.locale ? this.props.locale.locale : '', messages: this.props.locale ? this.props.locale.messages : {} },
            React.createElement(CatalogAwaiter, { domain: domain }, this.props.children)));
    }
}
export default inject('locale')(observer(MobxIntlProvider));
