import { useState } from 'react';
const initState = { top: [], bottom: [] };
function useStore(defaultPosition) {
    const [messageList, setMessageList] = useState(Object.assign({}, initState));
    return {
        messageList,
        add: (messageProps) => {
            const id = getId(messageProps);
            setMessageList((preState) => {
                var _a, _b;
                if (messageProps === null || messageProps === void 0 ? void 0 : messageProps.id) {
                    const position = getMessagePosition(preState, messageProps.id);
                    if (position)
                        return preState;
                }
                const position = messageProps.position || defaultPosition;
                const isTop = position.includes('top');
                const messages = isTop
                    ? [Object.assign(Object.assign({}, messageProps), { id }), ...((_a = preState[position]) !== null && _a !== void 0 ? _a : [])]
                    : [...((_b = preState[position]) !== null && _b !== void 0 ? _b : []), Object.assign(Object.assign({}, messageProps), { id })];
                return Object.assign(Object.assign({}, preState), { [position]: messages });
            });
            return id;
        },
        update: (id, messageProps) => {
            if (!id)
                return;
            setMessageList((prevState) => {
                const nextState = Object.assign({}, prevState);
                const { position, index } = findMessage(nextState, id);
                if (position && index !== -1) {
                    nextState[position][index] = Object.assign(Object.assign({}, nextState[position][index]), messageProps);
                }
                return nextState;
            });
        },
        remove: (id) => {
            setMessageList((prevState) => {
                const position = getMessagePosition(prevState, id);
                if (!position)
                    return prevState;
                return Object.assign(Object.assign({}, prevState), { [position]: prevState[position].filter((notice) => notice.id !== id) });
            });
        },
        clearAll: () => {
            setMessageList(Object.assign({}, initState));
        },
    };
}
let count = 1;
export function getId(messageProps) {
    if (messageProps.id) {
        return messageProps.id;
    }
    count += 1;
    return count;
}
export function getMessagePosition(messageList, id) {
    for (const [position, list] of Object.entries(messageList)) {
        if (list.find((item) => item.id === id)) {
            return position;
        }
    }
}
export function findMessage(messageList, id) {
    const position = getMessagePosition(messageList, id);
    const index = position
        ? messageList[position].findIndex((message) => message.id === id)
        : -1;
    return {
        position,
        index,
    };
}
export default useStore;