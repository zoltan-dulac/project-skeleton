import './style.scss';
import enableTooltip from '~enable-a11y/js/modules/tooltip';

class Tooltip {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'tooltip';
    enableTooltip.init();
  }
}

export default Tooltip;
