import * as React from 'react';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import './Article.css';

const normalizeUrl = (url) => {
  if (_.startsWith(url, 'http')) return url;
  return `https://${url}`;
}

const getStyle = (url) => {
  if (!url) return {};
  return { backgroundImage: `url(${normalizeUrl(url)})`};
}

export default class Article extends React.Component {
  render() {
    const { imgSrc, headline, url, source } = this.props;
    console.log(this.props)
    return (
      <article className="Article">
        <div className="Article-contentWrapper" style={getStyle(imgSrc)}>
          <a className="Article-link" href={url} target="_blank">
            <h4 className="Article-headline">{headline}&nbsp;</h4>
          </a>
        </div>
        <footer className="Article-footer">{source}</footer>
      </article>
    );
  }
}

Article.propTypes = {
  headline: PropTypes.string,
  url: PropTypes.string,
  source: PropTypes.string,
};
