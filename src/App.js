import React, { Component } from 'react';
// import SectionButton from './components/SectionButton/SectionButton';
// import PublisherContainer from './containers/PublisherContainer';
// import PersonalizationContainer from './containers/PersonalizationContainer';
import Slider from './components/Slider/Slider';
import Article from './components/Article/Article';
import './App.css';

class App extends Component {
  state = {
    personalization: 50,
    publisher: 50,
    loginStatus: null,
  };

  updateSliderValue = e => {
    const { id: inputId, value } = e.target;
    this.setState({
      [inputId]: parseInt(value, 10),
    });
  };

  getCurrentArticles = () => {
    return [
      {
        headline: 'Something happened this morning!!111',
        source: 'Washington Post',
        url: 'https://yahoo.com',
      },
      {
        headline: 'Something happened this morning!!111',
        source: 'Washington Post',
        url: 'https://yahoo.com',
      },
      {
        headline: 'Something happened this morning!!111',
        source: 'Washington Post',
        url: 'https://yahoo.com',
      },
      {
        headline: 'Something happened this morning!!111',
        source: 'Washington Post',
        url: 'https://yahoo.com',
      },
      {
        headline: 'Something happened this morning!!111',
        source: 'Washington Post',
        url: 'https://yahoo.com',
      },
    ];
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">A News Tool</h1>
          <h2 className="App-subtitle">Adjust the sliders, tune your news.</h2>
          <h2 className="App-subtitle">
            Powered by&nbsp;
            <a href="https://newsapi.org" rel="noopener noreferrer" target="_blank">
              NewsAPI.org
            </a>
          </h2>
        </header>
        <div className="App-body">
          <div className="App-articleWrapper">
            {this.getCurrentArticles().map((article, i) => <Article {...article} />)}
          </div>

          <div className="App-sliderContainer">
            <Slider
              color="blue"
              labelLeft="Untraditional publisher"
              labelRight="Established publisher"
              id="publisher"
              onChange={this.updateSliderValue}
            />
            <Slider
              color="green"
              labelLeft="Personalization algorithm"
              labelRight="Human editors"
              id="personalization"
              onChange={this.updateSliderValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
