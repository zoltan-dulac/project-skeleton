/* eslint-disable no-console */
import '~enable-a11y/js/modules/ablePlayerCustomizations';
import Cookies from 'js-cookie';
import './style.scss';

let isInitialized = false;


window.Cookies = Cookies;
console.log('Cookies', window.Cookies);

class VideoPlayer {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'video-player';
    console.log('video player');

    if (!isInitialized) {
      isInitialized = true;
      // eslint-disable-next-line no-console
      console.log('initialized');
    }
  }
}

export default VideoPlayer;
