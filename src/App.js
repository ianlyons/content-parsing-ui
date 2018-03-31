import React, { Component } from 'react';
import * as _ from 'lodash';
import Slider from './components/Slider/Slider';
import Article from './components/Article/Article';
import * as newsAPI from './apis/newsAPI';
import * as newsQueryUtils from './utils/newsQueryUtils';
import './App.css';

class App extends Component {
  state = {
    articles: [],
    error: null,
    queryConfig: {},
  };

  async componentDidMount() {
    // Load an initial generic query.
    try {
      const { articles } = await newsAPI.getEverything('a');
      this.setState({
        error: null,
        articles,
      });
    } catch (err) {
      this.setState({
        articles: [],
        error: 'There was an error loading the articles.',
      });
    }
  }

  updateQueryConfig = e => {
    const value = e.target.value;
    const configType = e.target.id;
    console.info(`Updating ${configType} value to ${value}.`);
    this.setState(
      {
        queryConfig: {
          ...this.state.queryConfig,
          [configType]: value,
        },
      },
      this.updateArticlesFromQuery
    );
  };

  // Debounce this so we only hit the API at the end of a slide.
  updateArticlesFromQuery = _.debounce(
    async () => {
      const params = newsQueryUtils.getQueryParams(this.state.queryConfig);
      try {
        const { articles } = await newsAPI.getEverything('a', params);
        this.setState({
          error: null,
          articles,
        });
      } catch (err) {
        this.setState({
          articles: [],
          error: 'There was an error loading the articles.',
        });
      }
    },
    200,
    { leading: false }
  );

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Content Parsing Algorithms</h1>
          <div className="App-configWrapper">
            <Slider
              onChange={this.updateQueryConfig}
              labelLeft="Non-traditional publisher"
              labelRight="Traditional publisher"
              id="publisherType"
            />
            <Slider
              onChange={this.updateQueryConfig}
              labelLeft="Personalization algorithms"
              labelRight="Human editors"
              id="personalization"
            />
            <Slider
              onChange={this.updateQueryConfig}
              labelLeft="Localized"
              labelRight="Global"
              id="geography"
            />
          </div>
        </header>
        <div className="App-body">
          {this.state.error && <div className="App-loadingError">{this.state.error}</div>}
          {this.state.articles && (
            <div className="App-articlesWrapper">
              {this.state.articles.map((article, i) => (
                <Article
                  key={i}
                  source={article.source.name}
                  headline={article.title}
                  url={article.url}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
