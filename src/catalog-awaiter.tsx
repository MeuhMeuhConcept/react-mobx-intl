import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { LocaleStore } from './locale-store'
import { Manager } from 'react-mobx-loader'

interface Props {
    locale?: LocaleStore
    domain: string
    fallback?: React.ComponentType<any>
}

interface State {}

export class CatalogAwaiter extends React.Component<Props, State> {

    render () {
        if (Manager.Manager.contentStrategy === 'wait') {
            if (!this.props.locale) {
                return this.fallback
            }

            if (!this.props.locale.hasActiveDomain(this.props.domain)) {
                return this.fallback
            }
        }

        return (
            <>
                { this.props.children }
            </>
        )
    }

    get fallback () {
        if (this.props.fallback) {
            return React.createElement(this.props.fallback)
        }

        return null
    }
}

export default inject('locale')(observer(CatalogAwaiter))
