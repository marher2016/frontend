import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Välkommen!
        </p>
        <a
          className="App-link"
          href="https://epochtimes.se/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Epoch Times Sverige
        </a>
      </header>
    </div>
  );
}

export default App;
