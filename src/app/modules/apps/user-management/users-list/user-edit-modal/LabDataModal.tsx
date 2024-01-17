import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty, toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import { initialUser, User } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { createUser, updateUser } from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";

type Props = {
  labId: number;
};

const addLabDataSchema = Yup.object().shape({
  signature: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("signature is required"),
  header: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("header is required"),
  footer: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("footer is required"),
});

const LabDataModal: FC<Props> = ({ labId }) => {
  const initialValues = {
    signature: "",
    header: "",
    footer: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addLabDataSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      // try {
      //   if (isNotEmpty(values.id)) {
      //     await updateUser(values);
      //   } else {
      //     await createUser(values);
      //   }
      // } catch (ex) {
      //   console.error(ex);
      // } finally {
      //   setSubmitting(true);
      //   cancel(true);
      // }
    },
  });

  return (
    <>
      <form
        id="kt_modal_add_lab_data"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        {/* begin::Scroll */}
        <div
          className="d-flex flex-column scroll-y me-n7 pe-7"
          id="kt_modal_add_lab_data"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_lab_data_header"
          data-kt-scroll-wrappers="#kt_modal_add_lab_data"
          data-kt-scroll-offset="300px"
        >
          {/* begin:: signature Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">Signature</label>
            {/* end::Label */}

            {/* begin:: Input */}
            <input
              placeholder="signature"
              {...formik.getFieldProps("signature")}
              type="file"
              name="signature"
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                {
                  "is-invalid":
                    formik.touched.signature && formik.errors.signature,
                },
                {
                  "is-valid":
                    formik.touched.signature && !formik.errors.signature,
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting}
            />
            {formik.touched.signature && formik.errors.signature && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.signature}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          {/* end::Input group */}

          {/* begin:: header Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">Header</label>
            {/* end::Label */}

            {/* begin:: Input */}
            <input
              placeholder="header"
              {...formik.getFieldProps("header")}
              type="file"
              name="header"
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                { "is-invalid": formik.touched.header && formik.errors.header },
                {
                  "is-valid": formik.touched.header && !formik.errors.header,
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting}
            />
            {formik.touched.header && formik.errors.header && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.header}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          {/* end::Input group */}

          {/* begin:: footer Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="fw-bold fs-6 mb-2">Footer</label>
            {/* end::Label */}

            {/* begin:: Input */}
            <input
              placeholder="footer"
              {...formik.getFieldProps("footer")}
              type="file"
              name="footer"
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                { "is-invalid": formik.touched.footer && formik.errors.footer },
                {
                  "is-valid": formik.touched.footer && !formik.errors.footer,
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting}
            />
            {formik.touched.footer && formik.errors.footer && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.footer}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          {/* end::Input group */}

        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => formik.resetForm()}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
            disabled={formik.isSubmitting}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className="indicator-label">Submit</span>
            {formik.isSubmitting && (
              <span className="indicator-progress">
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {formik.isSubmitting && <UsersListLoading />}
    </>
  );
};

export { LabDataModal };
