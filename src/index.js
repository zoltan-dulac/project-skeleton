/*
 * index.js : entry point into the application.
 */

/* eslint-disable no-console */
import 'utils/localPolyfills';
import { getJSON2 } from 'utils/fetch';
import textZoomEvent from 'text-zoom-event';
import loaders from 'components/loaders';

const renderClient = () => {
  textZoomEvent.init(16);
  const _setZoomCSS = () => {
    const resizeFactor = textZoomEvent.resizeFactor();
    const { body } = document;
    console.warn('resizeFactor', resizeFactor, getComputedStyle(body).getPropertyValue('--responsive-text-zoom-font-c-rem'));
    if (resizeFactor > 1) {
      body.classList.add('has-zoomed-text');
      // set variable on inline style
      body.style.setProperty('--responsive-font-c', body.style.getPropertyValue('--responsive-text-zoom-font-c-rem'));
    } else {
      document.body.classList.remove('has-zoomed-text');
      body.style.setProperty('--responsive-font-c', 0);
    }
  };

  // find all components on page by looking for els with data-component attributes
  const componentEls = document.querySelectorAll('[data-component]');
  const componentPromises = [];

  // loop through all the components that were previously found on the page
  Array.prototype.map.call(componentEls, el => {
    const name = el.getAttribute('data-component');

    // cache the props from the data-props attribute if it exists otherwise use an empty object
    let props = {};
    const propsId = el.getAttribute('data-props-id');
    if (propsId) {
      const propsEl = document.getElementById(propsId);
      if (propsEl) {
        try {
          props = JSON.parse(propsEl.innerText);
        } catch (e) {
          console.error('Problem with props JSON.  See below.');
          console.error(e.message);
          return false;
        }
      }
    }

    // check to see if there is a loader available for this component
    if (typeof loaders[name] !== 'undefined') {
      const remotePropsURL = el.getAttribute('data-props-remote');
      const useRemote = el.getAttribute('data-use-remote') && (el.getAttribute('data-use-remote') === 'true');
      const remoteProps = useRemote && remotePropsURL && getJSON2(remotePropsURL)
        .then(result => {
          // console.warn('result:', result);
          return result ? result : Promise.reject();
        })
        .catch(() => {
          // console.warn('catch', props);
          return Promise.resolve(props);
        });

      const getProps = (useRemote && remotePropsURL) ? Promise.resolve(remoteProps) : Promise.resolve(props);
      // console.warn('props', getProps);
      const componentPromise = getProps.then(_props => {
        // console.warn('loading', name, el, _props);
        return loaders[name](el, _props);
      }).catch((/* e */) => {
        /* eslint no-console: ["error", { allow: ["warn"] }] */
        // console.warn(e);
        return Promise.resolve();
      });

      componentPromises.push(componentPromise);
    } else {
      console.warn('Unable to find component loader: ' + name);
    }

    return true;
  });

  // after all the components have initialized we can continue the promise chain
  Promise.all(componentPromises).then((/* values */) => {
    // console.warn('done', componentPromises, values);
    return new Promise((resolve) => {
      // Asynchronously initialize the dynamic component renderer
      require.ensure([], (require) => {
        const DynamicComponentRenderer = require('utils/dynamicComponentRenderer').default;

        DynamicComponentRenderer();
        resolve();
      }, 'DynamicComponentRenderer');
    });
  });

  document.addEventListener('textzoom', _setZoomCSS);
  window.addEventListener('load', () => {
    _setZoomCSS();
  });
};

renderClient();
