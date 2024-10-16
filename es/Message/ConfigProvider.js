import React, { createContext, useRef, } from 'react';
import { MessageProvider } from '.';
export const ConfigContext = createContext({});
export function ConfigProvider(props) {
    const { children } = props;
    const messageRef = useRef(null);
    return (React.createElement(ConfigContext.Provider, { value: { messageRef } },
        React.createElement(MessageProvider, { ref: messageRef }),
        children));
}