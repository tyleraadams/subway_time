import React from 'react';
import Arrow from './arrow';
import './nav.css';
import ReactPaginate from 'react-paginate';
import get from 'lodash/get';
const Nav = props => {
  const regex = new RegExp('page%5Bnumber%5D=(\\d*)');
  // page%5Bnumber%5D=118&page%5Bsize%5D=20"
  const lastPage = get(get(props, 'links.last', '').match(regex), '[1]');
  return (
    <nav className="nav">
      <div>
        <ReactPaginate
          previousLabel={
            <div className="arrow-wrapper">
              <svg class="icon icon-arrow-left2" viewBox="0 0 32 32">
                <title>arrow-left2</title>
                <path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z" />
              </svg>
            </div>
          }
          nextLabel={
            <div className="arrow-wrapper">
              <svg class="icon icon-arrow-left2" viewBox="0 0 32 32">
                <title>arrow-right</title>
                <path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z" />
              </svg>
            </div>
          }
          breakLabel={<a>...</a>}
          breakClassName={'break-me'}
          pageCount={lastPage}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={props.getPage}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </nav>
  );
};

export default Nav;
