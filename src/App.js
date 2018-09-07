import React, { Component } from 'react';
// import logo from './logo.svg';
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

const updateInterval = 25

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      // ticker: null,
      running: false,
    };
  }

  tick = () => {
    this.setState((state) => ({time: state.time + updateInterval}));
  }

  start = () => {
    // set interval for every 10 ms since React can't update fast enough
    this.ticker = setInterval(this.tick, updateInterval);
    this.setState({
      running: true,
    });
  }

  pause = () => {
    clearInterval(this.ticker);
    this.setState({
      running: false,
    });
  }

  reset = () => {
    clearInterval(this.ticker);
    this.setState({
      time: 0,
      running: false,
    });
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  render() {
    return (
      <div>
        <h2>{prettyTime(this.state.time)}</h2>
        <button onClick={this.state.running ? this.pause : this.start}>
          {this.state.running ? 'Pause' : 'Start'}
        </button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  };
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">My Stopwatch</h1>
        </header>
        <div className="App-intro">
          <Stopwatch />
        </div>
      </div>
    );
  }
}

export default App;
