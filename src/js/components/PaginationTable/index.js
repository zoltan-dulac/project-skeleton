
// import PropTypes from 'prop-types';
import paginationTables from '~enable-a11y/js/modules/paginate';
import './style.scss';

class PaginationTable {
  constructor(element, props) {
    this.props = props;
    this.element = element;
    this.className = 'pagination-table';
    // eslint-disable-next-line no-console
    console.log('adding table in element', element);

    paginationTables.add(this.element.querySelector('table'));
  }
}

PaginationTable.propTypes = {
};

export default PaginationTable;
