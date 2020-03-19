"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_intl_1 = require("react-intl");
const mobx_react_1 = require("mobx-react");
const react_mobx_loader_1 = require("react-mobx-loader");
class MobxIntlProvider extends React.Component {
    render() {
        const loadingInformation = {
            progress: 0,
            errors: [],
            status: this.props.locale && this.props.locale.status === 'ready' ? 'done' : 'pending'
        };
        return (React.createElement(react_mobx_loader_1.Loader, { loadingInformation: loadingInformation },
            React.createElement(react_intl_1.IntlProvider, { locale: this.props.locale ? this.props.locale.locale : '', messages: this.props.locale ? this.props.locale.messages : {} }, this.props.children)));
    }
}
exports.MobxIntlProvider = MobxIntlProvider;
exports.default = mobx_react_1.inject('locale')(mobx_react_1.observer(MobxIntlProvider));
