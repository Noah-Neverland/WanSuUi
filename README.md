# React 组件库 wan-su

## Install

```
npm install --save wan-su@latest
```

## Usage

### Message

```javascript
import {ConfigProvider, useMessage} from 'wan-su';
import 'wan-su/dist/es/Message/index.css';

function Aaa() {
  const message = useMessage();

  return (
    <button
      onClick={() => {
        message.add({
          content: '请求成功',
        });
      }}
    >
      成功
    </button>
  );
}

function App() {
  return (
    <ConfigProvider>
      <div>
        <Aaa></Aaa>
      </div>
    </ConfigProvider>
  );
}

export default App;
```
