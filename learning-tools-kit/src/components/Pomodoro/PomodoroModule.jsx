import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect } from 'react';

const usePomodoroTimer = (initialSeconds) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

    useEffect(() => {
        if(!isRunning) return;

        const interval = setInterval(() =>{
            setSeconds(prev => {
                if(prev <= 1){
                    setIsRunning(false);
                    setSessions(prevSessions => prevSessions + 1);
                    return 0
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning]);
            
return {
    seconds,
    isRunning,
    sessions,
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    reset: () => setSeconds(initialSeconds),
    };
};  

const formatTime = (time) => {
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const PomodoroModule = ({ defaultMinutes = 25}) => {
    const initialSeconds = defaultMinutes * 60;
    const timer = usePomodoroTimer(initialSeconds);

return(
    <div>
        <h2>Pomodoro Timer</h2>
        <div>{formatTime(timer.seconds)}</div>
        <div>Licznik sessji{timer.prevSessions}</div>
        <div>
            <button onClick={timer.start}>Start</button>
            <button onClick={timer.reset}>Reset</button>
            <button onClick={timer.stop}>Stop</button>
        </div>
    </div>
);};



export default PomodoroModule;