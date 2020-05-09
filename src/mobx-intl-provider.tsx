import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { inject, observer } from 'mobx-react'
import CatalogAwaiter from './catalog-awaiter'
import { LocaleStore } from './locale-store'

interface Props {
    locale?: LocaleStore
    domain?: string
}

interface State {}

export class MobxIntlProvider extends React.Component<Props, State> {

    render () {

        let { domain } = this.props

        if (!domain) {
            domain = 'default'
        }

        return (
            <CatalogAwaiter domain={domain} >
                <IntlProvider
                    locale={this.props.locale ? this.props.locale.locale : ''}
                    messages={this.props.locale ? this.props.locale.messages : {}}
                >
                    { this.props.children }
                </IntlProvider>
            </CatalogAwaiter>
        )
    }
}

export default inject('locale')(observer(MobxIntlProvider))
