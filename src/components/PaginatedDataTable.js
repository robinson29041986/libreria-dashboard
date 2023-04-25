
import React, { useState } from "react";
import DataTable from "./DataTable";
import Paginator from "./Paginator";

const PaginatedDataTable = ({ data, headers, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const PaginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <DataTable data={PaginatedData} headers={headers} />
      <Paginator
        currentPage={currentPage}
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
};

export default PaginatedDataTable;