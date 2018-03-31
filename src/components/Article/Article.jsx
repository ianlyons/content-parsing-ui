import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Article.css';

export default class Article extends React.Component {
  render() {
    const { headline, url } = this.props;
    return (
      <article className="Article">
        <h4 className="Article-headline">{headline}&nbsp;</h4>
        <a className="Article-link" href={url} target="_blank">
          &#xe164;
        </a>
      </article>
    );
  }
}

Article.propTypes = {
  headline: PropTypes.string,
  url: PropTypes.string,
};
