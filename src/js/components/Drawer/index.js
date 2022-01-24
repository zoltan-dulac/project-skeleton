
import enableDrawer from '~enable-a11y/js/modules/enable-drawer';
import './style.scss';

class Drawer {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'drawer';

    enableDrawer.init();
  }
}


export default Drawer;
