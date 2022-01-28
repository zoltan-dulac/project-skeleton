
/* eslint-disable no-console */


const SliderLoader = (element, props) => {
  return new Promise((resolve, reject) =>
    require.ensure([], (require) => {
      const Component = require('./index').default;
      if (typeof element !== 'undefined' && typeof props !== 'undefined') {
        if (!element.getAttribute('data-initialized')) {
          try {
            const component = new Component(element, element.dataset);
            element.setAttribute('data-initialized', 'true');
            resolve(component);
          } catch (e) {
            reject(e);
          }
        } else {
          resolve();
        }
      } else {
        resolve(Component);
      }
    }, 'Slider')
  ).catch((err) => {
    console.log(err); // eslint-disable-line
  });
};

export default SliderLoader;
