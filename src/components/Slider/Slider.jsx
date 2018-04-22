import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Slider.css';

export default class Slider extends React.Component {
  render() {
    const { onChange, labelLeft, labelRight, id, color } = this.props;
    return (
      <div className="Slider">
        <label className="Slider-label" htmlFor={id}>
          {labelLeft}
        </label>
        <input className={`Slider-input Slider-input--${color}`} min={0} max={100} step={1} id={id} onChange={onChange} type="range" />
        <label className="Slider-label" htmlFor={id}>
          {labelRight}
        </label>
      </div>
    );
  }
}

Slider.propTypes = {
  onChange: PropTypes.func,
  labelLeft: PropTypes.string,
  labelRight: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.string, // supported are `blue` and `green`
};

