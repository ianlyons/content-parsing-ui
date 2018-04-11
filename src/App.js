import React, { Component } from 'react';
import SectionButton from './components/SectionButton/SectionButton';
import PublisherContainer from './containers/PublisherContainer';
import PersonalizationContainer from './containers/PersonalizationContainer';
import './App.css';

class App extends Component {
  state = {
    view: 'personalization',
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Content Parsing Algorithms</h1>
          <div className="App-attribution">
            <span>
              Content provided by&nbsp;
              <a href="https://newsapi.org" rel="noopener noreferrer" target="_blank">
                NewsAPI.org
              </a>
            </span>
          </div>
        </header>
        <div className="App-body">
          <nav className="App-nav">
            <SectionButton
              isActive={this.state.view === 'publisher'}
              onClick={() => this.setState({ view: 'publisher' })}
              text="Traditional/non-traditional publisher"
            />
            <SectionButton
              isActive={this.state.view === 'personalization'}
              onClick={() => this.setState({ view: 'personalization' })}
              text="Personalization algorithms/human editors"
            />
          </nav>
          <div className="App-contentWrapper">
            {this.state.view === 'publisher' && <PublisherContainer />}
            {this.state.view === 'personalization' && <PersonalizationContainer />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
