import * as React from 'react';
import * as newsAPI from '../apis/newsAPI';
import ArticleList from '../components/ArticleList/ArticleList';
import ArticleSplitView from '../components/ArticleSplitView/ArticleSplitView';

export default class PublisherContainer extends React.Component {
  state = {
    nonTradArticles: [],
    tradArticles: [],
    loading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });

    try {
      const [tradRes, nonTradRes] = await Promise.all([
        newsAPI.getEverything('a'),
        newsAPI.getHeadlines({ sources: ['usa-today'] }),
      ]);

      this.setState({
        nonTradArticles: nonTradRes.articles,
        tradArticles: tradRes.articles,
        loading: false,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        error: 'There was an error loading the articles.',
        loading: false,
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="PublisherContainer">
        <ArticleSplitView
          leftContent={<ArticleList articles={this.state.tradArticles} />}
          rightContent={<ArticleList articles={this.state.nonTradArticles} />}
        />
      </div>
    );
  }
}
