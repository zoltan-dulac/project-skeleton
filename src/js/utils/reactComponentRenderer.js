/**
 Component Renderer will render a new React component on the server side.
 **/

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

export default function renderReactComponentToString(Component, props) {
  return renderToString(<Component {...props} />);
}

export function renderReactComponentToStaticString(Component, props) {
  return renderToStaticMarkup(<Component {...props} />);
}
