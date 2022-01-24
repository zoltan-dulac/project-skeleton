
/* eslint-disable no-console */


const ListboxLoader = (element, props) => {
  return new Promise((resolve, reject) =>
    require.ensure([], (require) => {
      const Component = require('./index').default;
      if (typeof element !== 'undefined' && typeof props !== 'undefined') {
        if (!element.getAttribute('data-initialized')) {
          try {
            const component = new Component(element, props);
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
    }, 'Listbox')
  ).catch((err) => {
    console.log(err); // eslint-disable-line
  });
};

export default ListboxLoader;
