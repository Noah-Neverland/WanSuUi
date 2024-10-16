import React, { useMemo, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useStore from './hooks/useStore';
import { useTimer } from './hooks/useTimer';
const MessageItem = (item) => {
    const { onMouseEnter, onMouseLeave } = useTimer({
        id: item.id,
        duration: item.duration,
        remove: item.onClose,
    });
    return (React.createElement("div", { className: "message-item", onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave }, item.content));
};
export const MessageProvider = forwardRef((props, ref) => {
    const { messageList, add, remove, update, clearAll } = useStore('top');
    const positions = Object.keys(messageList);
    if ('current' in ref) {
        ref.current = {
            add,
            update,
            remove,
            clearAll,
        };
    }
    const messageWrapper = (React.createElement("div", { className: "message-wrapper" }, positions.map((direction) => {
        return (React.createElement(TransitionGroup, { className: `message-wrapper-${direction}`, key: direction }, messageList[direction].map((item) => {
            return (React.createElement(CSSTransition, { key: item.id, timeout: 1000, classNames: "message" },
                React.createElement(MessageItem, Object.assign({ onClose: remove }, item))));
        })));
    })));
    const el = useMemo(() => {
        const el = document.createElement('div');
        el.className = 'wrapper';
        document.body.appendChild(el);
        return el;
    }, []);
    return createPortal(messageWrapper, el);
});