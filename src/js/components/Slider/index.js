

import enableSliders from '~enable-a11y/js/modules/enable-slider';
import './style.scss';

class Slider {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'slider';

    enableSliders.add(this.element.querySelector('.enable-slider'));
  }
}


export default Slider;
