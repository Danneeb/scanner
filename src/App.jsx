import Quagga from 'quagga';
import { useState } from 'react';
import './App.css';

function App() {
  const [scanned, setScanned] = useState([]);

  const handleStart = () => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#yourElement'), // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ['ean_reader', 'ean_8_reader'],
        },
        area: {
          // defines rectangle of the detection/localization area
          top: '0%', // top offset
          right: '0%', // right offset
          left: '0%', // left offset
          bottom: '0%', // bottom offset
        },
      },
      function (err) {
        if (err) {
          console.log(err);
        }
        console.log('Initialization finished. Ready to start');
        Quagga.start();
      }
    );
  };

  Quagga.onProcessed((callback) => {
    console.log(callback);
  });
  Quagga.onDetected((result) => {
    setScanned(result.codeResult.code);
    console.log(result.codeResult.code);
  });
  const handleStop = () => {
    Quagga.stop();
    console.log(scanned);
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
