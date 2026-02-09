import { useEffect, useState } from "react";

export const usePomodoroTimer = (initialSeconds) =>{
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const [sessions, setSessions] = useState(0);

    useEffect(() =>{
        if(!isRunning || seconds <= 0) return;

        const interval = setInterval(() =>{
            setSeconds(prev => prev - 1);
        }, 1000);

        return() => clearInterval(interval);
    }, [isRunning, seconds]);

    useEffect(() => {
        if(seconds == 0){
            setIsRunning(false);
            setSessions(prev => prev + 1);
        }
    }, [seconds]);

return {
    seconds,
    isRunning,
    sessions,
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    reset: () => setSeconds(initialSeconds),
    };
};