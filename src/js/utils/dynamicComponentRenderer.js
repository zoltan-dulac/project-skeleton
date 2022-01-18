import getNodeToIgnoreArr from 'utils/mutationObservers';
import loaders from 'components/loaders';
import { jsonSafeParse } from 'utils/string';
import { getJSON2 } from 'utils/fetch';


// Whitelist sup nodes (ensure we are not excluding them).
const nodeToIgnoreArr = getNodeToIgnoreArr([], ['sup']);

// Set an attribute on dynamically rendered components to prevent re-rendering them via dynamicComponentRenderer.  CMC 2016-09-14 12:38:09 PM
const dynamicallyRenderedAttribute = 'data-has-dynamically-rendered';

export default function DynamicComponentRenderer() {
  const isReactComponentNode = function(node) {
    return node.nodeType === 1 &&
      node.hasAttribute('data-component');
  };

  const formatNode = function formatNode(node) {
    if (node && node.hasAttribute && !(node.hasAttribute(dynamicallyRenderedAttribute)) && node.nodeType === 1 && nodeToIgnoreArr.indexOf(node.tagName.toLowerCase()) < 0) {
      const nodeIsReactComponent = isReactComponentNode(node);

      if (nodeIsReactComponent) {
        const componentName = node.getAttribute('data-component');

        const props = (node.getAttribute('data-props')) ? jsonSafeParse(node.getAttribute('data-props')) : {};

        if (typeof props !== 'undefined' && typeof props.children === 'undefined' && node.childNodes.length > 0) {
          props.children = node.innerHTML;
        }

        // only try to render it once
        node.setAttribute(dynamicallyRenderedAttribute, '');

        const remoteProps = node.getAttribute('data-props-remote');
        const useRemote = (node.getAttribute('data-use-remote') && node.getAttribute('data-use-remote') === 'true');

        // check for remote JSON props
        if (typeof loaders[componentName] === 'function' && (props || remoteProps)) {
          try {
            const getProps = (useRemote && remoteProps) ? getJSON2(remoteProps)
              .then(result => {
                return result ? result : Promise.reject();
              })
              .catch(() => {
                return Promise.resolve(props);
              })
              : Promise.resolve(props);

            getProps.then(_props => {
              loaders[componentName](node, _props).then(() => {
                if (node.childNodes.length) {
                  for (let i = 0; i < node.childNodes.length; i++) {
                    formatNode(node.childNodes[i]);
                  }
                }
              });
            });
          } catch (ex) {
            // console.error(ex); // eslint-disable-line no-console
          }
        }
      } else {
        if (node.childNodes.length) {
          for (let i = 0; i < node.childNodes.length; i++) {
            formatNode(node.childNodes[i]);
          }
        }
      }
    }
  };

  (function() {
    /**
     *  initMutationObserver:  Observe the DOM for changes and make updates as necessary.
     *  Select the target node (we are intentionally using document instead of document.body to prevent an error where document.body may not be immediately available).
     */

    const target = document;

    // create an observer instance
    const observer = new MutationObserver(function(mutations) {
      const fnNodeListToArray = function(nodeList, node) {
        let nodeArr = [];

        if (nodeList && nodeList.length) {
          nodeArr = Array.prototype.slice.call(nodeList);
        }
        if (node) {
          nodeArr.push(node);
        }

        return nodeArr;
      };

      const fnIterateMutations = function(mutation) {
        const mutationAddedNodeArr = fnNodeListToArray(mutation.addedNodes).filter((q) =>
          nodeToIgnoreArr.indexOf(q.nodeName.toLowerCase()) < 0);

        const nodeArr = [];

        const fnAddNode = function(node) {
          if (Array.isArray(node)) {
            node.forEach(fnAddNode);
          } else {
            if (node && nodeToIgnoreArr.indexOf(node.nodeName.toLowerCase()) < 0 && nodeArr.indexOf(node) < 0) {
              nodeArr.push(node);
            }
          }
        };

        mutationAddedNodeArr.forEach((q) => {
          // Order matters here (q first, then q parent).
          fnAddNode([q, q.parentNode]);
        });

        nodeArr.forEach(formatNode);
      };

      mutations.forEach(fnIterateMutations);
    });

    // Configure the mutation observer.
    const config = {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true
    };

    // Start observing mutations.
    observer.observe(target, config);

    /* Perform an initial pass of rendering components already in the DOM, after observing mutations.
    Most components use data-props, however, DisclosureBubble can have children, data-props, title, or data-title as their data source.  Only query for [data-component] here. */
    const componentElementArr = Array.from(document.querySelectorAll('[data-component]'));

    while (componentElementArr.length) {
      // Order matters here, render from beginning to end.
      formatNode(componentElementArr.shift());
    }
  })();
}
