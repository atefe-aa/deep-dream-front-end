import { FC } from "react";

const Pagination: FC = () => {
  return (
    <div className="d-flex flex-stack flex-wrap pt-10">
      <div className="fs-6 fw-bold text-gray-700">
        Showing 1 to 10 of 50 entries
      </div>

      <ul className="pagination">
        <li className="page-item previous">
          <a href="#" className="page-link">
            <i className="previous"></i>
          </a>
        </li>

        <li className="page-item active">
          <a href="#" className="page-link">
            1
          </a>
        </li>

        <li className="page-item">
          <a href="#" className="page-link">
            2
          </a>
        </li>

        <li className="page-item">
          <a href="#" className="page-link">
            3
          </a>
        </li>

        <li className="page-item">
          <a href="#" className="page-link">
            4
          </a>
        </li>

        <li className="page-item">
          <a href="#" className="page-link">
            5
          </a>
        </li>

        <li className="page-item">
          <a href="#" className="page-link">
            6
          </a>
        </li>

        <li className="page-item next">
          <a href="#" className="page-link">
            <i className="next"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};
export { Pagination };
