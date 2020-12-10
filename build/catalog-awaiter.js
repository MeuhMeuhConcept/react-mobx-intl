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
const mobx_react_1 = require("mobx-react");
class CatalogAwaiter extends React.Component {
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
exports.CatalogAwaiter = CatalogAwaiter;
exports.default = mobx_react_1.inject('locale')(mobx_react_1.observer(CatalogAwaiter));
