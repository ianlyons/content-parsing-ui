import React, { Component } from 'react';
import Slider from './components/Slider/Slider';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Content Parsing Algorithms</h1>
          <div className="App-configWrapper">
            <Slider
              onChange={e => console.log(e)}
              labelLeft="Non-traditional publisher"
              labelRight="Traditional publisher"
              id="publisherType"
            />
            <Slider
              onChange={e => console.log(e)}
              labelLeft="Personalization algorithms"
              labelRight="Human editors"
              id="personalization"
            />
            <Slider
              onChange={e => console.log(e)}
              labelLeft="Localized"
              labelRight="Global"
              id="geographic"
            />
          </div>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
