"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimer = useTimer;
const react_1 = require("react");
function useTimer(props) {
    const { remove, id, duration = 2000 } = props;
    const timer = (0, react_1.useRef)(null);
    const startTimer = () => {
        timer.current = window.setTimeout(() => {
            remove(id);
            removeTimer();
        }, duration);
    };
    const removeTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    };
    (0, react_1.useEffect)(() => {
        startTimer();
        return () => removeTimer();
    }, []);
    const onMouseEnter = () => {
        removeTimer();
    };
    const onMouseLeave = () => {
        startTimer();
    };
    return {
        onMouseEnter,
        onMouseLeave,
    };
}