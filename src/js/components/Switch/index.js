
import PropTypes from 'prop-types';
import enableSwitch from '~enable-a11y/js/modules/switch';
import './style.scss';

class Switch {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'switch';
    const { id, labels } = props;

    this.cacheDomElements(element);
    this.bindEvents();

    element.innerHTML = `
        <button
            type="button"
            aria-labelledby="${id}__label"
            role="switch"
            aria-checked="true"
            id="${id}"
            class="switch"
            aria-describedby="${id}-checked">
            <span
                id="${id}-unchecked">
                ${labels.off}
            </span>
            <span
                id="${id}-checked">
                ${labels.on}
            </span>
        </button>
        <label
            id="${id}__label"
            class="switch--label">
            ${labels.main}
        </label>
    `;

    if (enableSwitch) {
      enableSwitch.init();
    }
  }

  cacheDomElements(/* element */) {
    // put all DOM caching properties here.
  }

  bindEvents() {
    // all eventhandlers should be here.
  }
}

Switch.propTypes = {
  id: PropTypes.string
};

export default Switch;
