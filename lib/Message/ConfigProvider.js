"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigContext = void 0;
exports.ConfigProvider = ConfigProvider;
const react_1 = require("react");
const _1 = require(".");
exports.ConfigContext = (0, react_1.createContext)({});
function ConfigProvider(props) {
    const { children } = props;
    const messageRef = (0, react_1.useRef)(null);
    return (react_1.default.createElement(exports.ConfigContext.Provider, { value: { messageRef } },
        react_1.default.createElement(_1.MessageProvider, { ref: messageRef }),
        children));
}