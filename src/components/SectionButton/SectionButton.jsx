import * as React from 'react';
import * as _ from 'lodash';
import './SectionButton.css';

const SectionButton = ({ text, isActive, ...props }) => {
  const classes = _.compact(['SectionButton', isActive && 'is-active']).join(' ');
  return (<button className={classes} {...props}>{text}</button>);
};

export default SectionButton;