import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function PomodoroModule({ topic }) {
  const [seconds, setSeconds] = useState(topic.estimatedMinutes * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    setSeconds(topic.estimatedMinutes * 60);
  }, [topic]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds(s => {
        if (s === 1) {
          setRunning(false);
          setSessions(n => n + 1);
          return topic.estimatedMinutes * 60;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, topic]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  return (
    <div>
      <h2>{topic.title}</h2>
      <ReactMarkdown>{topic.learningContent.markdown}</ReactMarkdown>

      <h1>{formatTime(seconds)}</h1>
      <p>Ukończone sesje: {sessions}</p>

      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Stop</button>
      <button onClick={() => setSeconds(topic.estimatedMinutes * 60)}>
        Reset
      </button>
    </div>
  );
}
