// This file is used to create the list of components to include in server side builds.

import renderReactComponentToString from 'utils/reactComponentRenderer';

const components = {};
/* 
components.LazyLoadingDemo = props => {
  const component = require('./LazyLoadingDemo').default;
  return renderReactComponentToString(component, props);
};

components.VideoPlayer = props => {
  const component = require('./VideoPlayer').default;
  return renderReactComponentToString(component, props);
};
*/

export default components;
