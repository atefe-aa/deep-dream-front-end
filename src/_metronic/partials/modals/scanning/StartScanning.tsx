import React, { FC } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";

import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const addSchema = Yup.object().shape({
  selectedCheckboxes: Yup.array()
    .min(1, "Select at least one slide!")
    .required("Select at least one slide!"),
});

interface FormValues {
  selectedCheckboxes: number[];
  selectAll: boolean;
}
const initialValues: FormValues = {
  selectedCheckboxes: [],
  selectAll: false,
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

const StartScanning: FC = () => {
  const [loading, setLoading] = useState(false);

  const checkboxes = Array.from({ length: 10 }, (_, index) => index + 1);
  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        console.log(values);
      } catch (error) {
        console.error(error);

        setStatus("The scanning details are incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("selectAll", e.target.checked);

    if (e.target.checked) {
      formik.setFieldValue("selectedCheckboxes", checkboxes);
    } else {
      formik.setFieldValue("selectedCheckboxes", []);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    let newSelectedCheckboxes = [...formik.values.selectedCheckboxes];

    if (checked) {
      newSelectedCheckboxes.push(+value);
    } else {
      newSelectedCheckboxes = newSelectedCheckboxes.filter(
        (checkbox) => checkbox !== +value
      );
    }

    formik.setFieldValue("selectedCheckboxes", newSelectedCheckboxes);

    // Update selectAll checkbox if all checkboxes are selected

    if (newSelectedCheckboxes.length === checkboxes.length) {
      formik.setFieldValue("selectAll", true);
    } else {
      formik.setFieldValue("selectAll", false);
    }
  };

  return (
    <div className="modal fade" id="kt_modal_start_scanning" aria-hidden="true">
      <div className="modal-dialog mw-650px">
        <div className="modal-content">
          <div className="modal-header pb-0 border-0 justify-content-end">
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <KTIcon iconName="cross" className="fs-1" />
            </div>
          </div>
          <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
            <div className="text-center mb-13">
              <h1 className="mb-3">Scanning Proccess</h1>

              <div className="text-muted fw-bold fs-5">
                If you need more info, please check out
                <a href="#" className="link-primary fw-bolder">
                  {" "}
                  FAQ Page
                </a>
                .
              </div>
            </div>

            <h3 className="form-label mb-5 fs-6 fw-bolder text-gray-900">
              Choose slide(s) to scan<span className="text-danger">*</span>
            </h3>

            <form
              className="form w-100"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              {formik.status && (
                <div className="mb-lg-15 alert alert-danger">
                  <div className="alert-text font-weight-bold">
                    {formik.status}
                  </div>
                </div>
              )}

              <div className="mb-8 border-bottom pb-3 form-check form-check-custom form-check-solid">
                <input
                  {...formik.getFieldProps("selectAll")}
                  className="form-check-input"
                  type="checkbox"
                  id="checkAll"
                  onChange={handleSelectAllChange}
                />
                <label className="ms-3 fw-bolder " htmlFor="checkAll">
                  Select All
                </label>
              </div>

              {checkboxes.map((checkboxValue) => (
                <div className="fv-row mb-3" key={`slide${checkboxValue}`}>
                  <div className="mb-10">
                    <div className="form-check form-check-custom form-check-solid">
                      <input
                        {...formik.getFieldProps("selectedCheckboxes")}
                        checked={
                          formik.values.selectAll ||
                          formik.values.selectedCheckboxes.includes(
                            checkboxValue
                          )
                        }
                        onChange={handleCheckboxChange}
                        className="form-check-input"
                        type="checkbox"
                        value={checkboxValue}
                        id={`slide${checkboxValue}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`slide${checkboxValue}`}
                      >
                        Slide {checkboxValue}
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              {formik.touched.selectedCheckboxes &&
                formik.errors.selectedCheckboxes && (
                  <div className="fv-plugins-message-container mb-4">
                    <div className="fv-help-block">
                      <span role="alert">
                        *** {formik.errors.selectedCheckboxes}
                      </span>
                    </div>
                  </div>
                )}

              {/* begin::Action */}
              <div className="d-grid mb-10">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formik.isSubmitting || !formik.isValid}
                >
                  {!loading && (
                    <span className="indicator-label">Scan labels</span>
                  )}
                  {loading && (
                    <span
                      className="indicator-progress"
                      style={{ display: "block" }}
                    >
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </button>
              </div>
              {/* end::Action */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StartScanning };
