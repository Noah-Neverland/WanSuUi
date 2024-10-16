import {ConfigProvider} from './components/Message/ConfigProvider';
import {useMessage} from './components/Message/hooks/useMessage';

function Aaa() {
  const message = useMessage();
  console.log('message===', message);
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
