import {ConfigProvider} from './packages/Message/ConfigProvider';
import {useMessage} from './packages/Message/hooks/useMessage';

function Aaa() {
  const message = useMessage();
  return (
    // <button
    //   onClick={() => {
    //     message.add({
    //       content: '请求成功',
    //     });
    //   }}
    // >
    //   成功
    // </button>
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
      <Aaa />
    </ConfigProvider>
  );
}

export default App;
