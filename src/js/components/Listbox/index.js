
import PropTypes from 'prop-types';
import { interpolate } from '~enable-a11y/js/modules/interpolate';
import enableListbox from '~enable-a11y/js/modules/enable-listbox';
import './style.scss';

class Listbox {
  constructor(element, props) {
    const { id } = props;

    this.props = props;
    this.element = element;
    this.className = 'listbox';

    this.cacheDomElements(element);

    this.element.innerHTML = interpolate(
      this.mainTemplate,
      props
    );

    this.$list = document.getElementById(`${id}_list`);
    this.$list.innerHTML = this.getValuesHTML();

    enableListbox.init();
  }

  cacheDomElements() {
    // put all DOM caching properties here.
    this.$mainTemplate = document.getElementById('listbox__main');
    this.mainTemplate = this.$mainTemplate.innerHTML;

    this.$itemTemplate = document.getElementById('listbox__item');
    this.itemTemplate = this.$itemTemplate.innerHTML;
  }

  getValuesHTML = () => {
    const { values } = this.props;
    const r = [];

    values.forEach((value) => {
      r.push(
        interpolate(
          this.itemTemplate,
          value
        )
      );
    });

    return r.join('');
  };
}

Listbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.arrayOf({
    displayValue: PropTypes.string,
    value: PropTypes.string
  })
};

export default Listbox;
