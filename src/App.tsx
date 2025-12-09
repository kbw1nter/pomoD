import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import playImg from "./assets/play.png";
import resetImg from "./assets/reset.png";
import workBtnClicked from "./assets/work-clicked.png";
import workBtn from "./assets/work.png";
import breakBtnClicked from "./assets/break-clicked.png";
import breakBtn from "./assets/break.png";
import idleGif from "./assets/idle.gif";
import workGif from "./assets/work.gif";
import breakGif from "./assets/break.gif";
import meowSound from "./assets/meow.mp3";
import closeBtn from "./assets/close.png";

function App() {
    const [timeLeft, setTimeLeft] = useState(25*60);
    const [isRunning, setIsRunning] = useState(false);
    const [breakButtonImage, setBreakButtonImage] = useState(breakBtn);
    const [workButtonImage, setWorkButtonImage] = useState(workBtn);
    const[isBreak, setIsBreak] = useState(false);
    const [encouraement, setEncouragement] = useState("");

    const cheerMessages = [
    "You Can Do It!",
    "I believe in you!",
    "You're amazing!",
    "Keep going!",
    "Stay focused!"
  ];

  const breakMessages = [
    "Stay hydrated!",
    "Snacks, maybe?",
    "Text me!",
    "I love you <3",
    "Stretch your legs!"
  ];

  useEffect(() => {
    let messageInterval: NodeJS.Timeout;

    if(isRunning){
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]);
      let index = 1;

      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 4000)
    } else {
      setEncouragement("");
    }
    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isRunning && timeLeft > 0){
        timer = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      }
      return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    useEffect(() => {
      switchMode(false);
    }, []);

    const formatTime = (seconds: number) : string => {
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`; 
    };

    const switchMode = (breakMode: boolean) => {
      setIsBreak(breakMode);
      setIsRunning(false);
      setBreakButtonImage(breakMode ? breakBtnClicked : breakBtn);
      setWorkButtonImage(breakMode ? workBtn : workBtnClicked);
      setWorkButtonImage(workBtn);
      setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
    }

    const handleClick = () => {
      if(!isRunning){
        setIsRunning(true);
      } else {
        setIsRunning(false);
        setTimeLeft(isBreak ? 5 * 60 : 25*60);
      }
    }

  const containerClass = `home-container ${isRunning ? 'background-green' : ''}`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className={`home-container ${isBreak ? 'background-green' : ''}`}>
        
        <button className="close-button"> 
          <img src={closeBtn} alt="Close" />
        </button>

        <div className="home-content">
          
          <div className="home-controls">
            <button className='image-button' onClick={() => switchMode(false)}>
              <img src={workButtonImage} alt="Work"/>
            </button>
            <button className='image-button' onClick={() => switchMode(true)}>
              <img src={breakButtonImage} alt="Break"/>
            </button>
          </div>

          <p className={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
             {encouraement}
          </p>

          <img src={isRunning ? (isBreak ? breakGif : workGif) : idleGif} alt="Character" className="gif-image" />

          <h1 className='home-timer'>{formatTime(timeLeft)}</h1>

          <button className='home-button' onClick={handleClick}>
             <img src={isRunning ? resetImg : playImg} alt="Start/Reset" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;