
// import PropTypes from 'prop-types';
import sortableTables from '~enable-a11y/js/modules/sortable-table';
import './style.scss';

class SortableTable {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'sortable-table';
    sortableTables.add(element);

    this.cacheDomElements(element);
    this.bindEvents();
  }

  cacheDomElements() {
    // put all DOM caching properties here.
    this.tableEl = this.element.querySelector('.deque-table-sortable');
  }

  bindEvents() {
    // all eventhandlers should be here.
  }
}

/* SortableTable.propTypes = {
}; */

export default SortableTable;
