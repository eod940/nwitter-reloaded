import {useState} from 'react';

function App() {
  const [clickCount, setClickCount] = useState(0);
  return (
    <>
      <h1>반가워요 eod940입니다.</h1>
      <a href={'https://github.com/eod940/nwitter-reloaded'}>깃허브입니다.</a>
      <br/>
      <br/>
      <button onClick={() => {
        if (clickCount < 10) {
          alert('누르지 말라니깐!!');
          setClickCount(prev => prev + 1);
        }
      }}>누르지 마세요
      </button>
    </>
  )
}

export default App
