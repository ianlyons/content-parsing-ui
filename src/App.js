import React, { Component } from 'react';
import * as _ from 'lodash';
import SectionButton from './components/SectionButton/SectionButton';
import LoginButton from './components/LoginButton/LoginButton';
import PublisherContainer from './containers/PublisherContainer';
import PersonalizationContainer from './containers/PersonalizationContainer';
import * as newsAPI from './apis/newsAPI';
import * as facebookAPI from './apis/facebookAPI';
import * as newsQueryUtils from './utils/newsQueryUtils';
import loadingGif from './pie-chart-loading.gif';
import './App.css';

class App extends Component {
  state = {
    view: 'publisher',
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

    window.likes = likes;

    const { sources } = await newsAPI.getSources();
    _.map(sources, source => {
      _.map(likes, like => {
        if (like.name.toLowerCase() === source.name.toLowerCase()) {
          console.log(`${like.name} matched!!11`);
        }
      });
    });
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
