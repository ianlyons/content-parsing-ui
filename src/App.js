import React, { Component } from 'react';
// import SectionButton from './components/SectionButton/SectionButton';
// import PublisherContainer from './containers/PublisherContainer';
// import PersonalizationContainer from './containers/PersonalizationContainer';
import Slider from './components/Slider/Slider';
import './App.css';

class App extends Component {
  state = {
    view: 'personalization',
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">A News Tool</h1>
          <h2 className="App-subtitle">Adjust the sliders, tune your news.</h2>
          <h2 className="App-subtitle">
            Powered by{' '}
            <a href="https://newsapi.org" rel="noopener noreferrer" target="_blank">
              NewsAPI.org
            </a>
          </h2>
        </header>
        <div className="App-body">
          <div className="App-sliderContainer">
            <Slider
              color="blue"
              labelLeft="Untraditional publisher"
              labelRight="Established publisher"
              id="publisher"
              onChange={console.log}
            />
            <Slider
              color="green"
              labelLeft="Personalization algorithm"
              labelRight="Human editors"
              id="personalization"
              onChange={console.log}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
