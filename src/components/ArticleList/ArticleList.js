import * as React from 'react';
import Article from '../Article/Article';
import './ArticleList.css';

const ArticleList = ({ articles }) => (
  <div className="ArticleList cf">
    {articles.map((article, i) => (
      <Article
        key={i}
        imgSrc={article.urlToImage}
        source={article.source.name}
        headline={article.title}
        url={article.url}
      />
    ))}
  </div>
);

export default ArticleList;
