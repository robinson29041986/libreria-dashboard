import { ArrowIosBack, ArrowIosForward } from "@easy-eva-icons/react";

const Paginator = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map((page) => page + 1);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);

  };

  return (
    <div>
      <button className="btn-paginator" disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        <ArrowIosBack className="icon_paginator" />
      </button>
      {pages.map((page) => (
        <button className={currentPage === page ? 'btn-paginator  btn-paginator-active' : 'btn-paginator'} key={page} onClick={() => handlePageChange(page)}>
          {page}
        </button>
      ))}
      <button className="btn-paginator" disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
        <ArrowIosForward className="icon_paginator" />
      </button>
    </div>
  );
};

export default Paginator;