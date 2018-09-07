import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function prettyTime(time) {
  const msInH = 1000 * 60 * 60;
  const msInMin = 1000 * 60;
  const msInSec = 1000

  let hours = Math.floor(time / msInH);
  let minutes = Math.floor((time - hours * msInH) / msInMin);
  let seconds = Math.floor((time - (hours * msInH + minutes * msInMin)) / msInSec);
  let milliseconds = time - (hours * msInH + minutes * msInMin + seconds * msInSec);
  
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  if (milliseconds < 10) {
    milliseconds = `00${milliseconds}`
  } else if (milliseconds < 100) {
    milliseconds = `0${milliseconds}`
  }

  return `${hours} hours ${minutes} minutes ${seconds} seconds ${milliseconds} milliseconds`;
}

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      ticker: null,
      running: false,
    };
  }

  tick() {
    this.setState((state) => ({time: state.time + 25}));
  }

  start() {
    // set interval for every 10 ms since React can't update fast enough
    const ticker = setInterval(() => this.tick(), 25);
    this.setState({
      ticker: ticker,
      running: true,
    });
  }

  pause() {
    clearInterval(this.state.ticker);
    this.setState({
      ticker: null,
      running: false,
    });
  }

  reset() {
    clearInterval(this.state.ticker);
    this.setState({
      time: 0,
      ticker: null,
      running: false,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker)
  }

  render() {
    let buttonText = "Start";
    let buttonFunc = () => this.start();
    if (this.state.running) {
      buttonText = "Pause"
      buttonFunc = () => this.pause();
    }

    return (
      <div>
        <h2>{prettyTime(this.state.time)}</h2>
        <button onClick={buttonFunc}>{buttonText}</button>
        <button onClick={() => this.reset()}>Reset</button>
      </div>
    );
  };
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My Stopwatch</h1>
        </header>
        <div className="App-intro" id="stopwatch">
          <Stopwatch />
        </div>
      </div>
    );
  }
}

export default App;
