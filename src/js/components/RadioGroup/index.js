
import enableRadioGroups from '~enable-a11y/js/modules/radiogroup';
import './style.scss';

class RadioGroup {
  constructor(element, props) {
    this.props = props;
    this.element = element;

    enableRadioGroups.add(this.element.querySelector('[role="radiogroup"]'));
  }
}

RadioGroup.propTypes = {
};

export default RadioGroup;
