import pauseAnimControl from '~enable-a11y/js/modules/pause-anim-control';
import './style.scss';

let hasLoaded = false;

class PauseAnimControl {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'pause-anim-control';

    if (!hasLoaded) {
      pauseAnimControl.init();
      hasLoaded = true;
    }
  }
}


export default PauseAnimControl;
