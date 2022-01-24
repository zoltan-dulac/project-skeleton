

import EnableCarousel from '~enable-a11y/js/modules/enable-carousel';
import enableVisibleOnFocus from '~enable-a11y/js/modules/enable-visible-on-focus';

import './style.scss';

class Carousel {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'carousel';

    this.cacheDomElements(element);
    const myCarousel = new EnableCarousel(this.$carousel);
    myCarousel.init();
    enableVisibleOnFocus.init();
  }

  cacheDomElements() {
    this.$carousel = this.element.querySelector('.glider');
  }
}


export default Carousel;
