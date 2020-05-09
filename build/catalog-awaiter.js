import * as React from 'react';
import { inject, observer } from 'mobx-react';
export class CatalogAwaiter extends React.Component {
    render() {
        if (!this.props.locale) {
            return this.fallback;
        }
        if (!this.props.locale.hasActiveDomain(this.props.domain)) {
            return this.fallback;
        }
        return (React.createElement(React.Fragment, null, this.props.children));
    }
    get fallback() {
        if (this.props.fallback) {
            return React.createElement(this.props.fallback);
        }
        return null;
    }
}
export default inject('locale')(observer(CatalogAwaiter));
