import * as React from 'react';
import * as _ from 'lodash';
import * as newsAPI from '../apis/newsAPI';
import * as facebookAPI from '../apis/facebookAPI';
import ArticleList from '../components/ArticleList/ArticleList';
import LoginScene from './LoginScene';
import ArticleSplitView from '../components/ArticleSplitView/ArticleSplitView';

export default class PersonalizationContainer extends React.Component {
  state = {
    personalizedArticles: [],
    editedArticles: [],
    loadingEditedArticles: false,
    loadingPersonalizedArticles: false,
    personalizedArticlesError: null,
    matchedPersonalizationSources: [],
    error: null,
    loginStatus: {},
  };

  loadFacebookPosts = async () => {
    this.setState({ loadingPersonalizedArticles: true });

    try {
      const loginStatus = await facebookAPI.getLoginStatus();
      const likes = await facebookAPI.getAllLikes(
        loginStatus.authResponse.userID,
        loginStatus.authResponse.accessToken
      );

      const { sources: newsSources } = await newsAPI.getSources();

      const matchedSources = _.compact(
        _.flatMap(newsSources, source => {
          return _.map(likes, like => {
            if (like.name.toLowerCase() === source.name.toLowerCase()) {
              return source;
            }
            return null;
          });
        })
      );

      this.setState({ matchedPersonalizationSources: matchedSources, loginStatus });

      const { articles: personalizedArticles } = await newsAPI.getHeadlines({
        sources: _.map(matchedSources, 'id'),
      });

      this.setState({
        personalizedArticles,
        loadingPersonalizedArticles: false,
        personalizedArticlesError: null,
      });
    } catch (err) {
      this.setState({ loadingPersonalizedArticles: false, personalizedArticlesError: err.message });
    }
  };

  async componentDidMount() {
    const loginStatus = await facebookAPI.getLoginStatus();

    this.setState({
      loadingEditedArticles: true,
      loginStatus,
    });

    if (loginStatus.status === 'connected') {
      this.loadFacebookPosts();
    }

    try {
      const { articles: editedArticles } = await newsAPI.getHeadlines({
        category: 'general',
        country: 'us',
      });

      this.setState({
        editedArticles,
        loadingEditedArticles: false,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        error: 'There was an error loading the articles.',
        loadingEditedArticles: false,
      });
    }
  }

  renderPersonalizedArticles = () => {
    if (this.state.loginStatus.status !== 'connected') {
      return <LoginScene onLogin={this.loadFacebookPosts} />;
    }
    return (
      <div>
        {this.state.personalizedArticlesError && (
          <span>{this.state.personalizedArticlesError}</span>
        )}
        {!this.state.loadingPersonalizedArticles && (
          <div>
            <div>
              Matching sources from:{' '}
              {_.map(this.state.matchedPersonalizationSources, 'name').join(', ')}
            </div>
            <ArticleList articles={this.state.personalizedArticles} />
          </div>
        )}
        {this.state.loadingPersonalizedArticles && <span>Loading articles...</span>}
      </div>
    );
  };

  render() {
    return (
      <div className="PersonalizationContainer">
        <ArticleSplitView
          leftContent={this.renderPersonalizedArticles()}
          rightContent={<ArticleList articles={this.state.editedArticles} />}
        />
      </div>
    );
  }
}
