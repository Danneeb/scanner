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
        numOfWorkers: 1,
        decoder: {
          readers: ['ean_reader', 'ean_8_reader'],
        },
        halfSample: true,
        locate: true,
        patchSize: 'medium',
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log('Initialization finished. Ready to start');
          Quagga.start();
          console.log(Quagga.CameraAccess.getActiveTrack())
          var track = Quagga.CameraAccess.getActiveTrack();
          var capabilities = track.getCapabilities(); track.applyConstraints({ advanced: [{zoom: capabilities.zoom.max}]}).catch(e => console.log(e));

         console.log(capabilities);
         if (capabilities.torch) {
          track.applyConstraints({
            advanced: [{torch: true}]
          })
          .catch(e => console.log(e));
        }
      }
        
        }
      
    );
    Quagga.onDetected((result) => {
      setScanned(result.codeResult.code);
      console.log(result.codeResult);

      Quagga.stop();
    });
  };

  Quagga.onProcessed(function (result) {
    var drawingCtx = Quagga.canvas.ctx.overlay,
    drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
        if (result.boxes) {
            drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
            result.boxes.filter(function (box) {
                return box !== result.box;
            }).forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
            });
        }

        if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
    }
});


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
