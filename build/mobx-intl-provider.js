import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { inject, observer } from 'mobx-react';
import { Loader } from 'react-mobx-loader';
export class MobxIntlProvider extends React.Component {
    render() {
        const loadingInformation = {
            progress: 0,
            errors: [],
            status: this.props.locale && this.props.locale.status === 'ready' ? 'done' : 'pending'
        };
        return (React.createElement(Loader, { loadingInformation: loadingInformation },
            React.createElement(IntlProvider, { locale: this.props.locale ? this.props.locale.locale : '', messages: this.props.locale ? this.props.locale.messages : {} }, this.props.children)));
    }
}
export default inject('locale')(observer(MobxIntlProvider));
