"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProvider = void 0;
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const react_transition_group_1 = require("react-transition-group");
const useStore_1 = require("./hooks/useStore");
const useTimer_1 = require("./hooks/useTimer");
const MessageItem = (item) => {
    const { onMouseEnter, onMouseLeave } = (0, useTimer_1.useTimer)({
        id: item.id,
        duration: item.duration,
        remove: item.onClose,
    });
    return (react_1.default.createElement("div", { className: "message-item", onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave }, item.content));
};
exports.MessageProvider = (0, react_1.forwardRef)((props, ref) => {
    const { messageList, add, remove, update, clearAll } = (0, useStore_1.default)('top');
    const positions = Object.keys(messageList);
    if ('current' in ref) {
        ref.current = {
            add,
            update,
            remove,
            clearAll,
        };
    }
    const messageWrapper = (react_1.default.createElement("div", { className: "message-wrapper" }, positions.map((direction) => {
        return (react_1.default.createElement(react_transition_group_1.TransitionGroup, { className: `message-wrapper-${direction}`, key: direction }, messageList[direction].map((item) => {
            return (react_1.default.createElement(react_transition_group_1.CSSTransition, { key: item.id, timeout: 1000, classNames: "message" },
                react_1.default.createElement(MessageItem, Object.assign({ onClose: remove }, item))));
        })));
    })));
    const el = (0, react_1.useMemo)(() => {
        const el = document.createElement('div');
        el.className = 'wrapper';
        document.body.appendChild(el);
        return el;
    }, []);
    return (0, react_dom_1.createPortal)(messageWrapper, el);
});