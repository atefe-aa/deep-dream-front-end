import React, { FC } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";

import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import QRCodeGenerator from "./QRCodeGenerator";

const addSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  age: Yup.number().min(1, "Minimum age is 1 ").required("Age is required"),
  sex: Yup.string().required("Gender is required"),
  testType: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(7, "Maximum 7 symbols")
    .required("Test Type is required"),
  laboratory: Yup.string()
    .min(1, "Minimum 3 symbols")
    .max(20, "Maximum 20 symbols")
    .required("Laboratory title is required"),
  discription: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(300, "Maximum 300 symbols"),
  labNumber: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(10, "Maximum 300 symbols"),
});

const initialValues = {
  name: "",
  age: "",
  sex: "",
  testType: "1",
  laboratory: "1",
  description: "",
  labNumber: "",
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

const AddNewTest: FC = () => {
  const [loading, setLoading] = useState(false);
  const [testNumber, setTestNumber] = useState<string>("");

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        console.log(values);
        setTestNumber("73578");
        // const {data: auth} = await login(values.email, values.password)
        // saveAuth(auth)
        // const {data: user} = await getUserByToken(auth.api_token)
        // setCurrentUser(user)
      } catch (error) {
        console.error(error);
        // saveAuth(undefined)
        setStatus("The login details are incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <div className="modal fade" id="kt_modal_invite_friends" aria-hidden="true">
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
            {testNumber !== "" ? (
              <QRCodeGenerator number={testNumber} />
            ) : (
              <>
                <div className="text-center mb-13">
                  <h1 className="mb-3">Add New Test</h1>

                  <div className="text-muted fw-bold fs-5">
                    If you need more info, please check out
                    <a href="#" className="link-primary fw-bolder">
                      {" "}
                      FAQ Page
                    </a>
                    .
                  </div>
                </div>
                <form
                  className="form w-100"
                  onSubmit={formik.handleSubmit}
                  noValidate
                  // id="kt_login_signin_form"
                >
                  {formik.status && (
                    <div className="mb-lg-15 alert alert-danger">
                      <div className="alert-text font-weight-bold">
                        {formik.status}
                      </div>
                    </div>
                  )}

                  {/* begin::Form group */}
                  <div className="fv-row mb-3">
                    <label className="form-label fs-6 fw-bolder text-gray-900">
                      Client's Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      placeholder="Full Name"
                      {...formik.getFieldProps("name")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.name && formik.errors.name,
                        },
                        {
                          "is-valid":
                            formik.touched.name && !formik.errors.name,
                        }
                      )}
                      type="text"
                      name="name"
                      autoComplete="off"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end::Form group */}

                  {/* begin::Form group */}
                  <div className="fv-row mb-3">
                    <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                      Age<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      autoComplete="off"
                      placeholder="Age"
                      {...formik.getFieldProps("age")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid": formik.touched.age && formik.errors.age,
                        },
                        {
                          "is-valid": formik.touched.age && !formik.errors.age,
                        }
                      )}
                    />
                    {formik.touched.age && formik.errors.age && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.age}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end::Form group */}

                  {/* begin::Form group */}
                  <div className="fv-row mb-3">
                    <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                      Gender<span className="text-danger">*</span>
                    </label>
                    <div
                      className={clsx(
                        "mt-3 mb-5 bg-transparent",
                        {
                          "is-invalid": formik.touched.sex && formik.errors.sex,
                        },
                        {
                          "is-valid": formik.touched.sex && !formik.errors.sex,
                        }
                      )}
                    >
                      <label className="radio">
                        <input
                          type="radio"
                          {...formik.getFieldProps("sex")}
                          value="1"
                          checked={formik.values.sex === "1"}
                        />
                        Female
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          {...formik.getFieldProps("sex")}
                          className="ms-5"
                          value="2"
                          checked={formik.values.sex === "2"}
                        />
                        Male
                      </label>
                    </div>
                    {formik.touched.sex && formik.errors.sex && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.sex}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end::Form group */}

                  {/* begin::Form group */}
                  <div className="fv-row mb-3">
                    <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                      Test Type<span className="text-danger">*</span>
                    </label>
                    <select
                      {...formik.getFieldProps("testType")}
                      className={clsx(
                        "form-select bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.testType && formik.errors.testType,
                        },
                        {
                          "is-valid":
                            formik.touched.testType && !formik.errors.testType,
                        }
                      )}
                      aria-label="Select test type"
                    >
                      <option disabled value="0">
                        Choose Test Type
                      </option>
                      <option value="1">CC</option>
                      <option value="2">GG</option>
                      <option value="3">DD</option>
                      <option value="4">HH</option>
                      <option value="5">FF</option>
                    </select>
                    {formik.touched.testType && formik.errors.testType && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.testType}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end::Form group */}

                  {/* begin::Form group */}
                  <div className="fv-row mb-3">
                    <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                      Description
                    </label>
                    <textarea
                      autoComplete="off"
                      {...formik.getFieldProps("description")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.description &&
                            formik.errors.description,
                        },
                        {
                          "is-valid":
                            formik.touched.description &&
                            !formik.errors.description,
                        }
                      )}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            <span role="alert">
                              {formik.errors.description}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                  {/* end::Form group */}

                  {/* begin::Form group */}
                  <div className="fv-row mb-8">
                    <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                      Laboratory<span className="text-danger">*</span>
                    </label>
                    <select
                      {...formik.getFieldProps("laboratory")}
                      className={clsx(
                        "form-select bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.laboratory &&
                            formik.errors.laboratory,
                        },
                        {
                          "is-valid":
                            formik.touched.laboratory &&
                            !formik.errors.laboratory,
                        }
                      )}
                      aria-label="Select Laboratory Title"
                    >
                      <option disabled>Choose Laboratory</option>
                      <option value="1">Milad</option>
                      <option value="2">Mohammad</option>
                      <option value="3">Ali</option>
                      <option value="4">HH</option>
                      <option value="5">FF</option>
                    </select>

                    {formik.touched.laboratory && formik.errors.laboratory && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.laboratory}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end::Form group */}
                  {/* begin::Form group */}
                  <div className="fv-row mb-3">
                    <label className="form-label fs-6 fw-bolder text-gray-900">
                      Laboratory Number
                    </label>
                    <input
                      placeholder="Laboratory Number"
                      {...formik.getFieldProps("labNumber")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.labNumber && formik.errors.labNumber,
                        },
                        {
                          "is-valid":
                            formik.touched.labNumber &&
                            !formik.errors.labNumber,
                        }
                      )}
                      type="text"
                      autoComplete="off"
                    />
                    {formik.touched.labNumber && formik.errors.labNumber && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          <span role="alert">{formik.errors.labNumber}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end::Form group */}

                  {/* begin::Action */}
                  <div className="d-grid mb-10">
                    <button
                      type="submit"
                      id="kt_sign_in_submit"
                      className="btn btn-primary"
                      disabled={formik.isSubmitting || !formik.isValid}
                    >
                      {!loading && (
                        <span className="indicator-label">Continue</span>
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
                </form>{" "}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddNewTest };
