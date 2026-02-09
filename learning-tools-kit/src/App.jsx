import PomodoroModule from './components/Pomodoro/PomodoroModule';

function App() {
  return (
    <div>
      <h1>Learning Tools Kit</h1>
      <PomodoroModule defaultMinutes={0.10} />
    </div>
  );
}

export default App;