import Quagga from 'quagga';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';

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
        numOfWorkers: 1,
        decoder: {
          readers: ['ean_reader', 'ean_8_reader'],
        },
        locate: true,
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log('Initialization finished. Ready to start');
          Quagga.start();
        }
      }
    );
    Quagga.onDetected((result) => {
      setScanned(result.codeResult.code);
      console.log(result.codeResult.code);

      Quagga.stop();
    });
  };

  const handleStop = () => {
    Quagga.stop();
    console.log(scanned);
  };

  return (
    <div className='App'>
     
      <div>
        <button onClick={handleStart}>Scan code</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      {scanned}
      <div id='yourElement' className='yourElement'></div>
    </div>
  );
}

export default App;
