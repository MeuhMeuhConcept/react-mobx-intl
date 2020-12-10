import * as React from 'react';
import { LocaleStore } from './locale-store';
interface Props {
    locale?: LocaleStore;
    domain: string;
    fallback?: React.ComponentType<any>;
}
interface State {
}
export declare class CatalogAwaiter extends React.Component<Props, State> {
    render(): JSX.Element | null;
    get fallback(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
}
declare const _default: typeof CatalogAwaiter & import("mobx-react").IWrappedComponent<Props>;
export default _default;
