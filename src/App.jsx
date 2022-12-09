import Quagga from 'quagga';
import { useEffect } from 'react';
import './App.css';

function App() {
  const handleStart = () => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#yourElement'), // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ['code_128_reader'],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Initialization finished. Ready to start');
        Quagga.start();
      }
    );
  };

  const handleStop = () => {
    Quagga.stop();
  };

  return (
    <div className='App'>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      <div id='yourElement'></div>
    </div>
  );
}

export default App;
