import { FC } from "react";

import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../ui/modals/ModalLayout";
import Checkbox from "./machine-settings/Checkbox";
import { TEST_TYPES } from "../../utils/constants";

const addSchema = Yup.object().shape({
  price: Yup.number()
    .min(1, "The min price can't be less than 1")
    .required("Price is required."),
  testType: Yup.string().required("Test Type is required"),
});

const initialValues = {
  testType: "",
  price: "",
};

type Props = {
  labName: string;
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

const AddNewTestPrice: React.FC<Props> = ({ labName }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        console.log(values);
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
    <ModalLayout
      modalId={`kt_modal_add_new_test_price_${labName.toLowerCase()}`}
    >
      <div className="text-center mb-13">
        <h1 className="mb-3">Add new test price</h1>
        <span>{labName} laboratory</span>
      </div>
      <form className="form w-100" onSubmit={formik.handleSubmit} noValidate>
        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}

        {/* begin::sex Form group */}
        <div className="fv-row mb-3">
          <label className="form-label required fw-bolder text-gray-900 fs-6 mb-0">
            Test Type
          </label>
          <div
            className={clsx(
              "mt-3 mb-5 bg-transparent",
              {
                "is-invalid": formik.touched.testType && formik.errors.testType,
              },
              {
                "is-valid": formik.touched.testType && !formik.errors.testType,
              }
            )}
          >
            <select
              {...formik.getFieldProps("testType")}
              className={clsx(
                "form-select",
                {
                  "is-invalid":
                    formik.touched.testType && formik.errors.testType,
                },
                {
                  "is-valid":
                    formik.touched.testType && !formik.errors.testType,
                }
              )}
              aria-label="Select Laboratory Title"
            >
              <option>Choose Test Type</option>
              {TEST_TYPES.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.title}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.testType && formik.errors.testType && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.testType}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::code Form group  */}
        <div className="fv-row mb-3">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            Price
          </label>
          <input
            placeholder="Test Price"
            {...formik.getFieldProps("price")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.price && formik.errors.price,
              },
              {
                "is-valid": formik.touched.price && !formik.errors.price,
              }
            )}
            type="number"
            name="price"
            autoComplete="off"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.price}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className="d-flex mb-10">
          <button
            type="submit"
            className="btn btn-primary me-4"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className="indicator-label">Continue</span>}
            {loading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>

          <button
            type="reset"
            className="btn btn-secondary"
            disabled={formik.isSubmitting}
            onClick={formik.handleReset}
          >
            <span className="indicator-label">Reset</span>
          </button>
        </div>
        {/* end::Action */}
      </form>
    </ModalLayout>
  );
};

export { AddNewTestPrice };
