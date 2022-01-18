

import PropTypes from 'prop-types';
import './style.scss';
import { interpolate } from '~enable-a11y/js/modules/interpolate';
import enableTabs from '~enable-a11y/js/modules/tabs';

class Tabs {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'tabs';

    this.cacheDomElements(element);
    this.createDOM();

    enableTabs.init();
  }

  cacheDomElements(element) {
    // put all DOM caching properties here.
    this.$tabList = element.querySelector('.enable-tablist');
    this.$tabPanelsContaniner = element.querySelector('.tabpanels');
    this.$tab = element.querySelector('#tabs-props');
    this.tabTemplate = document.querySelector('#enable-tab__template').innerHTML;
    this.tabpanelTemplate = document.querySelector('#enable-tabpanel__template').innerHTML;
  }

  createDOM() {
    const { id, tabs } = this.props;
    const tabListHTML = [];
    const tabPanelHTML = [];

    tabs.forEach((el, index) => {
      const { label, content } = el;

      tabListHTML.push(
        interpolate(
          this.tabTemplate,
          {
            id: id,
            label: label,
            index: index
          }
        )
      );

      tabPanelHTML.push(
        interpolate(
          this.tabpanelTemplate,
          {
            id: id,
            label: label,
            content: content,
            index: index
          }
        )
      );

      this.$tabList.innerHTML = tabListHTML.join('');
      this.$tabPanelsContaniner.innerHTML = tabPanelHTML.join('');
    });
  }
}

Tabs.propTypes = {
  id: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      content: PropTypes.string
    })
  )
};


export default Tabs;


