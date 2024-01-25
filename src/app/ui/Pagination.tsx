import { FC } from "react";
import { MetaModel } from "../modules/user-management/laboratories/core/_models";
import { getPageNumbers } from "../utils/helper";

interface PaginationProps {
  meta: MetaModel;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ meta, onPageChange }) => {
  const handlePageClick = (page: string | number) => {
    // Check if the page is a number and not the '...' string
    if (typeof page === "number" && page !== meta.current_page) {
      onPageChange(page);
    }
  };

  // Generating a range of page numbers to display
  const pages = getPageNumbers(meta);

  return (
    <div className="d-flex flex-stack flex-wrap pt-10">
      <div className="fs-6 fw-bold text-gray-700 mb-4">
        Showing {meta.from} to {meta.to} of {meta.total} entries
      </div>

      <ul className="pagination">
        <li
          className={`page-item previous ${
            meta.current_page === 1 ? "disabled" : ""
          }`}
        >
          <a
            href="#"
            className="page-link"
            onClick={() => handlePageClick(meta.current_page - 1)}
          >
            <i className="previous"></i> Previous
          </a>
        </li>

        {pages.map((page, index) => (
          <li
            key={index}
            className={`page-item ${
              typeof page === "number" && meta.current_page === page
                ? "active"
                : ""
            }`}
          >
            {typeof page === "number" ? (
              <a
                href="#"
                className="page-link"
                onClick={() => handlePageClick(page)}
              >
                {page}
              </a>
            ) : (
              <span className="page-link">{page}</span>
            )}
          </li>
        ))}

        <li
          className={`page-item next ${
            meta.current_page === meta.last_page ? "disabled" : ""
          }`}
        >
          <a
            href="#"
            className="page-link"
            onClick={() => handlePageClick(meta.current_page + 1)}
          >
            Next <i className="next"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export { Pagination };
