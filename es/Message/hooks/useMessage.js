import { useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';
export function useMessage() {
    const { messageRef } = useContext(ConfigContext);
    if (!messageRef) {
        throw new Error('请在最外层添加 ConfigProvider 组件');
    }
    return messageRef.current;
}