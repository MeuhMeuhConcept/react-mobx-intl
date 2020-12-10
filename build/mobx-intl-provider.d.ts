import * as React from 'react';
import { LocaleStore } from './locale-store';
interface Props {
    locale?: LocaleStore;
    domain?: string;
}
interface State {
}
export declare class MobxIntlProvider extends React.Component<Props, State> {
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element | null;
}
declare const _default: typeof MobxIntlProvider & import("mobx-react").IWrappedComponent<Props>;
export default _default;
