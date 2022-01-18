import { BREAKPOINTS } from 'constants/index';
import Debounce from './debounce';

const _initialState = {
  xs: false,
  sm: false,
  md: false,
  lg: true,
  screen: 'lg',
  orientation: false
};

function getScreenSizeState() {
  const state = Object.assign({}, _initialState);

  if (typeof document !== 'undefined') {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    if (width >= BREAKPOINTS.lg) {
      state.md = false;
      state.sm = false;
      state.xs = false;
      state.lg = true;
      state.screen = 'lg';
    } else if (width >= BREAKPOINTS.md) {
      state.lg = false;
      state.md = true;
      state.sm = false;
      state.xs = false;
      state.screen = 'md';
    } else if (width >= BREAKPOINTS.sm) {
      state.lg = false;
      state.md = false;
      state.sm = true;
      state.screen = 'sm';
    } else if (width >= BREAKPOINTS.xs) {
      state.lg = false;
      state.md = false;
      state.sm = false;
      state.xs = true;
      state.screen = 'xs';
    }

    if (width > height) {
      state.orientation = 'landscape';
    } else {
      state.orientation = 'portrait';
    }
  }

  return state;
}

function CheckScreenType(Component) {
  return class extends Component {
    static displayName = Component.name + '-cst';

    constructor(props) {
      super(props);

      this.state = (Object.assign({}, this.state || {}, _initialState));

      this._willMount = false;

      this._isMounted = false;

      this._screenSizeInited = false;
    }

    componentDidMount() {
      if (super.componentDidMount) {
        super.componentDidMount();
      }

      this._isMounted = true;

      if (!this._screenSizeInited) {
        this._setScreenSizeState();
      }

      window.addEventListener('resize', Debounce(this._setScreenSizeState, 150));
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }

      this._willMount = false;

      this._isMounted = false;

      window.removeEventListener('resize', Debounce(this._setScreenSizeState, 150));
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
      if (super.componentWillMount) {
        super.componentWillMount();
      }

      this._willMount = true;

      if (typeof document !== 'undefined') {
        this._setScreenSizeState();
      }
    }

    static getScreenSizeState = getScreenSizeState;


    _setScreenSizeState = () => {
      this._screenSizeInited = true;

      const { constructor } = this;

      const state = constructor.getScreenSizeState();

      if (this.state.xs !== state.xs ||
        this.state.sm !== state.sm ||
        this.state.md !== state.md ||
        this.state.lg !== state.lg ||
        this.state.screen !== state.screen
      ) {
        // Let's make sure that the component has actually mounted. Otherwise we leak the eventHandler and component has already unMounted.
        if (this._willMount || this._isMounted) {
          this.setState(state);
        }

        // trigger resize event in parent component
        if (this._isMounted && this._resize) {
          this._resize();
        }
      }
    };
  };
}

// Create a static method that can be called by other components that don't want to share state with CheckScreenType, but do want to get the appropriate screen state information.
CheckScreenType.getScreenSizeState = getScreenSizeState;
export default CheckScreenType;
