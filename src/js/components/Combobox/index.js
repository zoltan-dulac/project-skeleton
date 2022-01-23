
import PropTypes from 'prop-types';
import comboboxes from '~enable-a11y/js/modules/combobox';
import { interpolate } from '~enable-a11y/js/modules/interpolate';

import './style.scss';

class Combobox {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    const { id } = props;
    this.className = 'combobox';

    this.cacheDomElements(element);

    this.element.innerHTML = interpolate(
      this.mainTemplate,
      this.props
    );

    const $list = document.getElementById(`${id}__list`);
    $list.innerHTML = this.getValuesHTML();
    comboboxes.add(element.querySelector('.enable-combobox'));
    element.setAttribute('data-initialized', 'true');
  }

  getValuesHTML = () => {
    const r = [];
    const { autocomplete } = this.props;

    autocomplete.forEach((value) => {
      r.push(
        interpolate(
          this.itemTemplate,
          {
            value: value
          }
        )
      );
    });

    return r.join('');
  };

  cacheDomElements = () => {
    // put all DOM caching properties here.

    this.$mainTemplate = document.getElementById(`${this.className}__main`);
    this.mainTemplate = this.$mainTemplate ? this.$mainTemplate.innerHTML : '';

    this.$itemTemplate = document.getElementById(`${this.className}__item`);
    this.itemTemplate = this.$itemTemplate ? this.$itemTemplate.innerHTML : '';
  };
}

Combobox.propTypes = {
  'id': PropTypes.string,
  'label': PropTypes.string,
  'sr-instructions': PropTypes.string,
  'autocomplete': PropTypes.arrayOf(PropTypes.string)
};

export default Combobox;
