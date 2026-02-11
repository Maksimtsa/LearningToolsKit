import { useState } from "react";
import "./FlashCards.css";

export default function FlashcardsModule({ topic }) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!topic) return <p>Brak tematu</p>;

  const question = topic.questions[index];

  const next = () => {
    if (index < topic.questions.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div>
      <h2>{topic.title} - Fiszki</h2>

      <div
        className="card"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? question.answer : question.question}
      </div>

      <p>{index + 1} / {topic.questions.length}</p>

      <button onClick={prev} disabled={index === 0}>
        Poprzednie
      </button>

      <button
        onClick={next}
        disabled={index === topic.questions.length - 1}
      >
        Następne
      </button>
    </div>
  );
}
