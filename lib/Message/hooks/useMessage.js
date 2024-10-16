"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMessage = useMessage;
const react_1 = require("react");
const ConfigProvider_1 = require("../ConfigProvider");
function useMessage() {
    const { messageRef } = (0, react_1.useContext)(ConfigProvider_1.ConfigContext);
    if (!messageRef) {
        throw new Error('请在最外层添加 ConfigProvider 组件');
    }
    return messageRef.current;
}