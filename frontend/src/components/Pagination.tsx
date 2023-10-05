import { useState } from "react";
import "./Pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  handlePageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  handlePageSizeChange,
}) => {
  const [offersPerPageOptions] = useState([5, 6, 10, 12, 15, 20, 30, 50, 100]);
  return (
    <div className="pagination">
      <div className="one-third"></div>
      <div className="page-selection one-third">
        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>

      <div className="one-third">
        <span>Show per page:</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="page-size-select"
        >
          {offersPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
