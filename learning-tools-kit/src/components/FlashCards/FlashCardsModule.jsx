import { useState } from "react";
import "../FlashCards/FlashCards.css";

export default function FlashcardsModule({ topic }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const q = topic.questions[index];

  return (
    <div className="flashcards">
      <h2>{topic.title} – Fiszki</h2>

      <div className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(f => !f)}>
        {flipped ? q.answer : q.question}
      </div>

      <p>{index + 1} / {topic.questions.length}</p>

      <button onClick={() => { setIndex(i => Math.max(i - 1, 0)); setFlipped(false); }}>
        Poprzednie
      </button>
      <button onClick={() => { setIndex(i => Math.min(i + 1, topic.questions.length - 1)); setFlipped(false); }}>
        Następne
      </button> 
    </div>
  );
}
