import * as React from 'react';
import * as PropTypes from 'prop-types';
import './Slider.css';

export default class Slider extends React.Component {
  render() {
    const { onChange, labelLeft, labelRight, id } = this.props;
    return (
      <div className="Slider">
        <input min={0} max={10} step={1} id={id} onChange={onChange} type="range" />
        <div className="Slider-labelWrapper">
          <label className="Slider-label" htmlFor={id}>
            {labelLeft}
          </label>
          <label className="Slider-label" htmlFor={id}>
            {labelRight}
          </label>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  onChange: PropTypes.func,
  labelLeft: PropTypes.string,
  labelRight: PropTypes.string,
  id: PropTypes.string,
};
