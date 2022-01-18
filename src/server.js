/* eslint-disable no-param-reassign */

import 'babel-polyfill';

import { jsonSafeParse } from 'utils/string';

import components from 'components/renderers';

export default {
  renderServer(componentName, props) {
    props = typeof props === 'string' ? jsonSafeParse(props) : props;

    return components[componentName](props);
  }
};
