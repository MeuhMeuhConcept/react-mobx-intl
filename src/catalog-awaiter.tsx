import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { LocaleStore } from './locale-store'

interface Props {
    locale?: LocaleStore
    domain: string
    fallback?: React.ComponentType<any>
}

interface State {}

export class CatalogAwaiter extends React.Component<Props, State> {

    render () {

        if (!this.props.locale) {
            return this.fallback
        }

        const catalogs = this.props.locale.getCatalogsByDomain(this.props.domain)

        if (catalogs.length === 0) {
            return this.fallback
        }

        for (const c of catalogs) {
            if (c.status !== 'ready') {
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
