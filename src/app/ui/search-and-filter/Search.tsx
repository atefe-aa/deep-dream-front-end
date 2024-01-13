import { FC } from "react";
import { KTIcon } from "../../../_metronic/helpers";

const Search: FC = () => {
  return (
    <>
      <div
        id="kt_header_search"
        className="header-search d-flex align-items-center w-100"
        data-kt-search-keypress="true"
        data-kt-search-min-length="2"
        data-kt-search-enter="enter"
        data-kt-search-layout="menu"
        data-kt-search-responsive="false"
        data-kt-menu-trigger="auto"
        data-kt-menu-permanent="true"
        data-kt-menu-placement="bottom-start"
        data-kt-search="true"
      >
        <form
          data-kt-search-element="form"
          className="w-100 position-relative mb-5 mb-lg-0"
          autoComplete="off"
        >
          <KTIcon
            iconName="magnifier"
            className="fs-2 text-lg-3 text-gray-800 position-absolute top-50 translate-middle-y ms-5"
          />
          {/*begin::Input*/}
          <input
            type="text"
            className="search-input form-control form-control-solid ps-13"
            name="search"
            placeholder="Search..."
            data-kt-search-element="input"
          />
          {/*end::Input*/}
          {/*begin::Spinner*/}
          <span
            className="position-absolute top-50 end-0 translate-middle-y lh-0 me-5 d-none"
            data-kt-search-element="spinner"
          >
            <span className="spinner-border h-15px w-15px align-middle text-gray-500"></span>
          </span>
          {/*end::Spinner*/}
          {/*begin::Reset*/}
          <span
            className="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 me-4 d-none"
            data-kt-search-element="clear"
          >
            <KTIcon iconName="cross" className=" fs-2 text-lg-1 me-0" />
          </span>
          {/*end::Reset*/}
        </form>
      </div>
    </>
  );
};

export { Search };
