import { useEffect, useState } from "react";
import PomodoroModule from "./components/Pomodoro/PomodoroModule.jsx";
import FlashcardsModule from "./components/FlashCards/FlashcardsModule.jsx";
import "./App.css";

export default function App() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [tab, setTab] = useState("pomodoro");

  useEffect(() => {
    fetch("/data/topics/index.json")
      .then(res => res.json())
      .then(files =>
        Promise.all(
          files.map(f =>
            fetch(`/data/topics/${f}`).then(r => r.json())
          )
        )
      )
      .then(setTopics);
  }, []);

  if (!topics.length) return <p>Brak</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Learning Tools Kit</h1>
      {!selectedTopic && (
        <div>
          <h3>Wybierz temat:</h3>
            {topics.map(t => (
              <button key={t.topicId} onClick={() => setSelectedTopic(t.topicId)}>
                {t.title}
              </button>
            ))}
        </div>
      )}

      {selectedTopic && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => setTab("pomodoro")}>
            Pomodoro
          </button>
          <button onClick={() => setTab("flashcards")}>
            Fiszki
          </button>
        </div>
      )}

      {selectedTopic && tab === "pomodoro" && (
        <PomodoroModule topic={topics.find(t => t.topicId === selectedTopic)}/>
      )}

      {selectedTopic && tab === "flashcards" && (
        <FlashcardsModule topic={topics.find(t => t.topicId === selectedTopic)}/>
      )}
    </div>
  );
}
