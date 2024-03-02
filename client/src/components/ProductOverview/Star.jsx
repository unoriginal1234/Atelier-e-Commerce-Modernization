import React from 'react';
import PropTypes from 'prop-types';

const Star = ({ filled, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'gold' : 'none'}
      stroke="gold"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-star"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      ></polygon>
    </svg>
  );
};

Star.propTypes = {
  filled: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired, // Add size prop for specifying the size of the star
};

Star.defaultProps = {
  size: 24, // Default size of the star is set to 24
};

export default Star;
