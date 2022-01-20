
import PropTypes from 'prop-types';
import { spinbuttons } from '~enable-a11y/js/modules/spinbutton';
import './style.scss';

class SpinButton {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'spin-button';
    const { id, min, max, value, inc } = props;

    element.innerHTML = `
      <label
        id="${id}_label"
        class="sbLabel"
      >
        Choose a number between 0 and 100
      </label>
      <div
        class="spinbutton__instructions sr-only"
        id="${id}_instructions"
      >
        Use the arrow keys or use the stepper buttons after this element to increase and decrease the values
      </div>
      <div class="enable-spinner">
        <div
          id="${id}"
          class="spinbutton"
          role="spinbutton"
          aria-labelledby="${id}_label"
          aria-describedby="${id}_instructions"
          aria-valuemin="${min}"
          aria-valuemax="${max}"
          aria-valuenow="${value}"
          data-increment="${inc}"
          tabindex="0"
        >
          50
        </div>
        <div
          id="${id}__up"
          class="enable-spinner__button enable-spinner__button--up"
          role="button"
        >
          <img
            src="images/button-arrow-up.png"
            alt="Increase Value"
          >
        </div>
        <div
          id="${id}__down"
          class="enable-spinner__button enable-spinner__button--down"
          role="button"
        >
          <img
            src="images/button-arrow-down.png"
            alt="Decrease Value"
          >
        </div>
        <div
          class="sr-only"
          id="${id}__live"
          role="alert"
          aria-live="assertive"
        >
          50
        </div>
      </div>
    `;

    spinbuttons.add(document.getElementById(id));
  }
}

SpinButton.propTypes = {
  id: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  inc: PropTypes.number,
  value: PropTypes.number
};

export default SpinButton;
