import PropTypes from 'prop-types';
import '~enable-a11y/js/modules/checkbox';
import './style.scss';

class Checkbox {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'checkbox';

    const { id, label, value } = props;


    element.innerHTML = `
      <div
        class="checkbox-container"
      >
        <label
          id="${id}"
        >
          ${label}:
        </label>
        <div
          aria-labelledby="${id}"
          role="checkbox"
          tabindex="0"
          aria-checked="${value}"
        >
        </div>
      </div>
    `;
  }
}

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool
};

export default Checkbox;
