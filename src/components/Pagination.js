import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  BsChevronDoubleLeft, BsChevronLeft, BsChevronRight, BsChevronDoubleRight,
} from 'react-icons/bs';
import MyContext from '../context/MyContext';
import '../assets/css/Pagination.css';

function Pagination({ paging }) {
  const { setOffset } = useContext(MyContext);

  const { limit, offset, total } = paging;

  const MAX_BUTTONS = 7;
  const MAX_LEFT = (MAX_BUTTONS - 1) / 2;

  const currentPage = offset ? (offset / limit) + 1 : 1;
  const pages = Math.min(Math.ceil(total / limit), 50);
  const firstPage = currentPage + MAX_LEFT >= pages
    ? Math.max(pages - (MAX_BUTTONS - 1), 1) : Math.max(currentPage - MAX_LEFT, 1);

  const onPageChange = (page) => {
    setOffset((page - 1) * limit);
  };

  return (
    <section className="pagination">
      <button
        className="pagination-react-icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        type="button"
      >
        <BsChevronDoubleLeft />
      </button>
      <button
        className="pagination-react-icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        <BsChevronLeft />
      </button>
      {
      Array.from({ length: Math.min(MAX_BUTTONS, pages) })
        .map((_, i) => i + firstPage)
        .map((page) => (
          <button
            className={
              page === currentPage
                ? 'pagination__item--active'
                : null
            }
            key={page}
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
          </button>
        ))
      }
      <button
        className="pagination-react-icon"
        disabled={currentPage === pages}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        <BsChevronRight />
      </button>
      <button
        className="pagination-react-icon"
        disabled={currentPage === pages}
        onClick={() => onPageChange(pages)}
        type="button"
      >
        <BsChevronDoubleRight />
      </button>
    </section>
  );
}

Pagination.propTypes = {
  paging: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Pagination;
