import React, { Component } from 'react';
import * as _ from 'lodash';
import Slider from './components/Slider/Slider';
import Article from './components/Article/Article';
import LoginButton from './components/LoginButton/LoginButton';
import * as newsAPI from './apis/newsAPI';
import * as facebookAPI from './apis/facebookAPI';
import * as newsQueryUtils from './utils/newsQueryUtils';
import loadingGif from './pie-chart-loading.gif';
import './App.css';

class App extends Component {
  state = {
    loading: false,
    articles: [],
    error: null,
    queryConfig: {},
  };

  async componentDidMount() {
    // Load an initial generic query.
    this.setState({ loading: true });

    try {
      const { articles } = await newsAPI.getEverything('a');
      this.setState({
        error: null,
        articles,
        loading: false,
      });
    } catch (err) {
      this.setState({
        articles: [],
        error: 'There was an error loading the articles.',
        loading: false,
      });
    }

    const loginStatus = await facebookAPI.getLoginStatus();
    console.log(loginStatus);
    const likes = await facebookAPI.getAllLikes(
      loginStatus.authResponse.userID,
      loginStatus.authResponse.accessToken
    );
    console.log('likes is: ', likes);
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
      this.setState({ loading: true });

      try {
        const { articles } = await newsAPI.getEverything('a', params);
        this.setState({
          loading: false,
          error: null,
          articles,
        });
      } catch (err) {
        this.setState({
          loading: false,
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
          <div className="App-attribution">
            <span>
              Content provided by&nbsp;
              <a href="https://newsapi.org" rel="noopener noreferrer" target="_blank">
                NewsAPI.org
              </a>
            </span>
            <LoginButton />
          </div>
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
          <div className="App-sidebarWrapper" />
          <div className="App-contentWrapper">
            {this.state.loading && (
              <div className="App-loading">
                <img src={loadingGif} alt="" />
              </div>
            )}
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
      </div>
    );
  }
}

export default App;
