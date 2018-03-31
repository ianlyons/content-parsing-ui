import React, { Component } from 'react';
import Slider from './components/Slider/Slider';
import Article from './components/Article/Article';
import * as newsAPI from './apis/newsAPI';
import './App.css';

class App extends Component {
  state = {
    articles: [],
    error: null,
  };

  async componentDidMount() {
    try {
      const { articles } = await newsAPI.get();
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
