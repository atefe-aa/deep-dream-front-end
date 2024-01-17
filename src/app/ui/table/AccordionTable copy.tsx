import { FC } from "react";
import { KTIcon } from "../../../_metronic/helpers";
import { DropDownButton } from "../dropdown/DropDownButton";

type Props = {
  className: string;
  tableTitle: string;
};

const AccordionTable: FC<Props> = ({ className, tableTitle }) => {
  return (
    <>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">{tableTitle}</span>
          </h3>
          <div
            className="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Click to add a user"
          >
            <a
              href="#"
              className="btn btn-sm btn-light-primary"
              data-bs-toggle="modal"
              data-bs-target={`#kt_modal_add_new_test_price_${tableTitle.toLowerCase()}`}
            >
              <KTIcon iconName="plus" className="fs-3" />
              New Test Price
            </a>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bold text-muted">
                  <th className="w-25px">
                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                      #
                    </div>
                  </th>
                  <th className="min-w-100px">Title</th>
                  <th className="min-w-100px">Price(R)</th>
                  <th className="min-w-100px">Extra Slides Price(R)</th>
                  <th className="min-w-100px">Description</th>
                  <th className="min-w-100px text-end">Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody className="accordion" id="accordionPanelsStayOpenExample">
                <tr className="accordion-item">
                  <td>
                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                      1
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="d-flex justify-content-start flex-column">
                        <a
                          href="#"
                          className="text-gray-900 fw-bold text-hover-primary fs-6"
                        >
                          nammee
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                    >
                      30000
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                    >
                      200000
                    </a>
                  </td>
                  <td>
                    <a
                      href="#"
                      className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                    >
                      desscription
                    </a>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end flex-shrink-0">
                      <button
                        className="accordion-button btn text-center btn-icon"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne"
                      ></button>

                      <DropDownButton>
                        <div className="menu-item px-3">
                          <a href="#" className="menu-link px-3">
                            <KTIcon iconName="pencil" className="fs-3 me-3" />
                            Edit Info
                          </a>
                        </div>
                        <div className="menu-item px-3 my-1">
                          <a
                            href="#"
                            className="menu-link px-3 text-danger "
                            data-bs-toggle="tooltip"
                            title="Delete Test Price"
                          >
                            <KTIcon iconName="trash" className="fs-3 me-3" />
                            Delete Test Price
                          </a>
                        </div>
                      </DropDownButton>
                    </div>
                  </td>
                </tr>
                <tr
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse show "
                  aria-labelledby="panelsStayOpen-headingOne"
                >
                  <td className="" colSpan={6}>
                    <strong>This is the first item's accordion body.</strong>
                    It is shown by default, until the collapse plugin adds the
                    appropriate classes that we use to style each element. These
                    classes control the overall appearance, as well as the
                    showing and hiding via CSS transitions. You can modify any
                    of this with custom CSS or overriding our default variables.
                    It's also worth noting that just about any HTML can go
                    within the
                    <code>.accordion-body</code>, though the transition does
                    limit overflow.
                  </td>
                </tr>

                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingTwo"
                  >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseTwo"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseTwo"
                    >
                      Accordion Item #2
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingTwo"
                  >
                    <div className="accordion-body">
                      <strong>This is the second item's accordion body.</strong>
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the
                      <code>.accordion-body</code>, though the transition does
                      limit overflow.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2
                    className="accordion-header"
                    id="panelsStayOpen-headingThree"
                  >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                    >
                      Accordion Item #3
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="panelsStayOpen-headingThree"
                  >
                    <div className="accordion-body">
                      <strong>This is the third item's accordion body.</strong>
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the
                      <code>.accordion-body</code>, though the transition does
                      limit overflow.
                    </div>
                  </div>
                </div>
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </>
  );
};

export { AccordionTable };
