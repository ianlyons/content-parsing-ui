import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

import * as newsAPI from '../../apis/newsAPI';
import * as facebookAPI from '../../apis/facebookAPI';
import Slider from '../Slider/Slider';
import LoginScene from './LoginScene';

import './FilterBar.css';

export default class FilterBar extends React.Component {
  state = {
    error: null,
    loginStatus: {},
  };

  loadPersonalizedSources = async () => {
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
      this.loadPersonalizedSources();
    }
  }

  renderPersonalizationFilter = () => {
    if (this.state.loginStatus.status !== 'connected') {
      return <LoginScene onLogin={this.loadFacebookPosts} />;
    }

    const { onSliderChange } = this.props;
    return (
      <div>
        <Slider
          color="green"
          labelLeft="Personalization algorithm"
          labelRight="Human editors"
          id="personalization"
          onChange={onSliderChange}
        />
          <div>
              Matching sources from:{' '}
              {_.map(this.state.matchedPersonalizationSources, 'name').join(', ')}
          </div>
      </div>
    );
  };

  render() {
    const { onSliderChange } = this.props;
    return (
      <div className="FilterBar">
        <Slider
          color="blue"
          labelLeft="Untraditional publisher"
          labelRight="Established publisher"
          id="publisher"
          onChange={onSliderChange}
        />
        <div className="FilterBar-personalizationFilter">
          {this.renderPersonalizationFilter()}
        </div>
      </div>
    );
  }
}

FilterBar.propTypes = {
  onSliderChange: PropTypes.func,
  onSourcesChange: PropTypes.func
}
