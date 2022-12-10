import { useState } from 'react';
import Scanner from './components/Scanner';
import './App.css';

function App() {
  const [camera, setCamera] = useState(false);
  const [result, setResult] = useState(null);

  const onDetected = (result) => {
    setResult(result);
  };
  console.log(result);
  return (
    <div className='App'>
      <p>{result ? result : 'Scanning...'}</p>
      <button onClick={() => setCamera(!camera)}>
        {camera ? 'Stop' : 'Start'}
      </button>
      <div className=''>{camera && <Scanner onDetected={onDetected} />}</div>
    </div>
  );
}

export default App;
