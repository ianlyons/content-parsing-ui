import React, { Component } from 'react';
import * as _ from 'lodash';
// import SectionButton from './components/SectionButton/SectionButton';
// import PublisherContainer from './containers/PublisherContainer';
// import PersonalizationContainer from './containers/PersonalizationContainer';
import Slider from './components/Slider/Slider';
import Article from './components/Article/Article';
import * as newsQueryUtils from './utils/newsQueryUtils';
import './App.css';

class App extends Component {
  state = {
    personalization: 50,
    publisher: 50,
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

  componentDidMount() {
    this.queryArticles();
  }

  queryArticles = async () => {
    const { personalization: personalizationScore, publisher: tradPublisherScore } = this.state;
    try {
      const res = await Promise.all(
        newsQueryUtils.getQueries({
          personalizationScore,
          tradPublisherScore,
        })
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
