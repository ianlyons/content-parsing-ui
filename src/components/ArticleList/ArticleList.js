import * as React from 'react';
import Article from '../Article/Article';

const ArticleList = ({ articles }) => (
  <div className="ArticleList">
    {articles.map((article, i) => (
      <Article key={i} source={article.source.name} headline={article.title} url={article.url} />
    ))}
  </div>
);

export default ArticleList;
