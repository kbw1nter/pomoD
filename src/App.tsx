import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [timeLeft, setTimeLeft] = useState(25*60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isRunning && timeLeft > 0){
        timer = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      }
      return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds: number) : string => {
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`; 
    };

  return (
    <div style={{position: 'relative'}}>
    <div>
      <button className="closeButton">
        Close
      </button>

      <div className="home-content"></div>
        <div className="home-controls">
          <button className='image-button'>
            Work
          </button>
          <button className='image-button'>
            Break
          </button>
      </div>
      <p>
        You can do it!
      </p>

      <h1 className='home-timer'>25:00</h1>

      <button className='home-button'>
        Start
      </button>

    </div>
    </div>
  );
}

export default App;