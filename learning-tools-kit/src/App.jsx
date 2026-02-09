import PomodoroModule from './components/Pomodoro/PomodoroModule';

function App() {
  return (
    <div>
      <h1>Learning Tools Kit</h1>
      <PomodoroModule defaultMinutes={25} />
    </div>
  );
}

export default App;