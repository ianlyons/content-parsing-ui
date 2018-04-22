import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Article.css';

export default class Article extends React.Component {
  render() {
    const { headline, url, source } = this.props;

    return (
      <article className="Article">
        <header className="Article-header">{source}</header>
        <div className="Article-contentWrapper">
          <a className="Article-link" href={url} target="_blank">
            <h4 className="Article-headline">{headline}&nbsp;</h4>
          </a>
        </div>
      </article>
    );
  }
}

Article.propTypes = {
  headline: PropTypes.string,
  url: PropTypes.string,
  source: PropTypes.string,
};
