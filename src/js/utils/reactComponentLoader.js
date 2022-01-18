/* eslint-disable no-console */

import React from 'react';
import { render } from 'react-dom';

export default function renderReactComponent(Component, element, props) {
  return new Promise((resolve, reject) => {
    try {
      render(<Component {...props} />, element, resolve);
    } catch (e) {
      console.error(`renderReactComponent() failed when rendering ${Component.name}`);
      reject(e);
    }
  });
}
