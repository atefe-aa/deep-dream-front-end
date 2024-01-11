import { FC } from "react";

import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../ui/modals/ModalLayout";
import Checkbox from "./machine-settings/Checkbox";
import { TEST_TYPES } from "../../utils/constants";

const addSchema = Yup.object().shape({
  number: Yup.number().required("Slide Number is required."),
  xPosition: Yup.number().required("X Position is required."),
  yPosition: Yup.number().required("Y Position is required."),
});

const initialValues = {
  number: 0,
  xPosition: 0,
  yPosition: 0,
};

// type Props = {
//   labName: string;
// };

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

const AddNewSlide: FC= ( ) => {
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
    <ModalLayout modalId="kt_modal_add_new_slide">
      <div className="text-center mb-13">
        <h1 className="mb-3">Add new slide</h1>
      </div>
      <form className="form w-100" onSubmit={formik.handleSubmit} noValidate>
        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}

        {/* begin::code Form group  */}
        <div className="fv-row mb-3">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            Slide Number
          </label>
          <input
            placeholder="Slide Number"
            {...formik.getFieldProps("number")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.number && formik.errors.number,
              },
              {
                "is-valid": formik.touched.number && !formik.errors.number,
              }
            )}
            type="number"
            name="number"
            autoComplete="off"
          />
          {formik.touched.number && formik.errors.number && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.number}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::code Form group  */}
        <div className="fv-row mb-3">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            X position
          </label>
          <input
            placeholder="X Position"
            {...formik.getFieldProps("xPosition")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.xPosition && formik.errors.xPosition,
              },
              {
                "is-valid":
                  formik.touched.xPosition && !formik.errors.xPosition,
              }
            )}
            type="number"
            name="xPosition"
            autoComplete="off"
          />
          {formik.touched.xPosition && formik.errors.xPosition && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.xPosition}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::code Form group  */}
        <div className="fv-row mb-3">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            Y Position
          </label>
          <input
            placeholder="Y Position"
            {...formik.getFieldProps("yPosition")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.yPosition && formik.errors.yPosition,
              },
              {
                "is-valid":
                  formik.touched.yPosition && !formik.errors.yPosition,
              }
            )}
            type="number"
            name="yPosition"
            autoComplete="off"
          />
          {formik.touched.yPosition && formik.errors.yPosition && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.yPosition}</span>
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

export { AddNewSlide };
