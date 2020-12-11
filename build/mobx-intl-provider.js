"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_intl_1 = require("react-intl");
const mobx_react_1 = require("mobx-react");
const catalog_awaiter_1 = __importDefault(require("./catalog-awaiter"));
class MobxIntlProvider extends React.Component {
    render() {
        let { domain } = this.props;
        if (!domain) {
            domain = 'default';
        }
        return (React.createElement(react_intl_1.IntlProvider, { locale: this.props.locale ? this.props.locale.locale : '', messages: this.props.locale ? this.props.locale.messages : {} },
            React.createElement(catalog_awaiter_1.default, { domain: domain }, this.props.children)));
    }
}
exports.MobxIntlProvider = MobxIntlProvider;
exports.default = mobx_react_1.inject('locale')(mobx_react_1.observer(MobxIntlProvider));
