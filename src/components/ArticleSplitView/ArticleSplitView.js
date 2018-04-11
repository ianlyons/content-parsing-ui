import * as React from 'react';
import './ArticleSplitView.css';

const ArticleSplitView = ({ leftContent, rightContent }) => (
  <section className="ArticleSplitView">
    <div className="ArticleSplitView-leftContent ArticleSplitView-content">{leftContent}</div>
    <div className="ArticleSplitView-rightContent  ArticleSplitView-content">{rightContent}</div>
  </section>
);

export default ArticleSplitView;
