import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { inject, observer } from 'mobx-react'
import { Loader, LoaderRequest } from 'react-mobx-loader'
import { LocaleStore } from './locale-store'

interface Props {
    locale?: LocaleStore
}

interface State {}

export class MobxIntlProvider extends React.Component<Props, State> {

    render () {
        const loadingInformation: LoaderRequest.Informations = {
            progress: 0,
            errors: [],
            status: this.props.locale && this.props.locale.status === 'ready' ? 'done' : 'pending'
        }

        return (
            <Loader loadingInformation={loadingInformation}>
                <IntlProvider
                    locale={this.props.locale ? this.props.locale.locale : ''}
                    messages={this.props.locale ? this.props.locale.messages : {}}
                >
                    { this.props.children }
                </IntlProvider>
            </Loader>
        )
    }
}

export default inject('locale')(observer(MobxIntlProvider))
