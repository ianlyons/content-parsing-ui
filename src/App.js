import React, { Component } from 'react';
import * as _ from 'lodash';
import FilterBar from './components/FilterBar/FilterBar';
import Article from './components/Article/Article';
import * as newsQueryUtils from './utils/newsQueryUtils';
import './App.css';

class App extends Component {
  state = {
    publisher: 50,
    personalization: null, // this turns into a number when the user logs into facebook
    personalizationSources: [],
    loginStatus: null,
    articles: [],
  };

  updateSliderValue = e => {
    const { id: inputId, value } = e.target;
    this.setState(
      {
        [inputId]: parseInt(value, 10),
      },
      this.debouncedQueryArticles
    );
  };

  updatePersonalizationSources = sources => {
    this.setState({
      personalizationSources: sources,
    });
  };

  componentDidMount() {
    this.queryArticles();
  }

  queryArticles = async () => {
    const {
      personalization: personalizationScore,
      publisher: tradPublisherScore,
      personalizationSources,
    } = this.state;
    try {
      const res = await Promise.all(
        newsQueryUtils.getQueries(
          {
            personalizationScore,
            tradPublisherScore,
          },
          personalizationSources
        )
      );

      const articles = _.shuffle(_.flatMap(res, 'articles'));
      this.setState({ articles });
    } catch (err) {
      console.error(err);
    }
  };

  // Creating a debounced version for updateSliderValue to reference so we don't fire a
  // million requests as users slide the bar.
  debouncedQueryArticles = _.debounce(this.queryArticles, 150, { leading: false });

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
            {this.state.articles.map((article, i) => (
              <Article key={i} headline={article.title} source={article.source.name} />
            ))}
          </div>

          <div className="App-sliderContainer">
            <FilterBar
              onSliderChange={this.updateSliderValue}
              onSourcesChange={this.updatePersonalizationSources}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
