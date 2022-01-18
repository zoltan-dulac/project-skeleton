import PropTypes from 'prop-types';

export const ANIMATION = {
  mainTransitionSpeed: 400,
  mainEase: [0.13, 0.73, 0.58, 1]
};

// This needs to be in sync with the values in src/styles/shared/_variables.scss.
export const BREAKPOINTS = {
  xl: 1366,
  lg: 1024,
  md: 640,
  sm: 480,
  xs: 0
};

export const COLUMNS = {
  lg: 12,
  md: 12,
  sm: 4,
  xs: 4
};

export const FILTER_PROPS = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      subfilter: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired
        })
      )
    })
  ),
  rootRef: PropTypes.func,
  parentClassName: PropTypes.string
};


export const SORTER_PROPS = {
  parentClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  criteria: PropTypes.arrayOf(
    PropTypes.shape(
      {
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      }
    )
  ),
  type: PropTypes.oneOf(['checkbox', 'button'])
};

export const PRODUCT_SHAPE = {
  isFeatured: PropTypes.bool,
  isBestPerformance: PropTypes.bool,
  eyebrow: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
  tagline: PropTypes.string.isRequired,
  points: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  teaser: PropTypes.string.isRequired,
  img: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string
  })
};

export const JSX_TYPE = [
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
];
/*
export {
  ANIMATION,
  BREAKPOINTS,
  COLUMNS,
  FILTER_PROPS,
  SORTER_PROPS,
  PRODUCT_SHAPE,
  JSX_TYPE
};
*/
