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
    const { onSourcesChange } = this.props;
    try {
      const loginStatus = await facebookAPI.getLoginStatus();
      const likes = await facebookAPI.getAllLikes(
        loginStatus.authResponse.userID,
        loginStatus.authResponse.accessToken
      );

      console.log('likes is: ', likes);

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

      onSourcesChange(matchedSources);
    } catch (err) {
      this.setState({ error: 'Error loading personalized sources.' });
    }
  };

  async componentDidMount() {
    const loginStatus = await facebookAPI.getLoginStatus();

    this.setState({
      loginStatus,
    });

    if (loginStatus.status === 'connected') {
      this.loadPersonalizedSources();
    }
  }

  renderPersonalizationFilter = () => {
    if (this.state.loginStatus.status !== 'connected') {

      return <div className="FilterBar-loginWrapper"><LoginScene onLogin={this.loadPersonalizedSources} /></div>;
    }

    const { onSliderChange, matchedSources } = this.props;
    return (
      <div>
        <Slider
          color="green"
          labelLeft="Personalization algorithm"
          labelRight="Human editors"
          id="personalization"
          onChange={onSliderChange}
        />
        {
          matchedSources.length > 0 &&
          <div className="FilterBar-matchedSources">
            Matching sources from:&nbsp;{_.map(matchedSources, 'name').join(', ')}
          </div>
        }
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
  onSourcesChange: PropTypes.func,
  matchedSources: PropTypes.arrayOf(PropTypes.object)
}
