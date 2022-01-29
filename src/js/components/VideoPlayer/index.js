import '~enable-a11y/js/modules/ablePlayerCustomizations.js';

import './style.scss';

let isInitialized = false;

class VideoPlayer {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'video-player';

    if (!isInitialized) {
      isInitialized = true;
    }
  }
}

export default VideoPlayer;
