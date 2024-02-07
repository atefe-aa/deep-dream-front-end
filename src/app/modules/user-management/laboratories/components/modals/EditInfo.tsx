import { FC } from "react";

import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../../../ui/modals/ModalForm";
import { KTIcon, toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import { LabsModel } from "../../core/_models";
import { useEditInfo } from "../../hooks/useEditInfo";
import { FormLabel } from "react-bootstrap";
import { useCloseModalOnSuccess } from "../../../../hooks/useCloseModalOnSuccess";

const addSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols"),
  labName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols"),
  username: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols"),
  phone: Yup.string().min(3, "Minimum 3 symbols").max(50, "Maximum 50 symbols"),
  address: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols"),
  description: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(100, "Maximum 100 symbols"),
  password: Yup.string().min(7, "Password must be at least 7 charecter"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .min(7, "Password must be at least 7 charecter"),
});

type Props = {
  labData: LabsModel;
};

const EditInfo: FC<Props> = ({ labData }) => {
  const initialValues = {
    fullName: labData.fullName || "",
    labName: labData.labName || "",
    username: labData.username || "",
    phone: labData.phone || "",
    address: labData.address || "",
    description: labData.description || "",
    password: "",
    password_confirmation: "",
  };

  const { editLaboratoryInfo, isPending, error,data } = useEditInfo();
  const [showPasswprd, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      if (error?.message) {
        setStatus(error.message);
      }
      try {
        editLaboratoryInfo([labData.id, values]);
      } catch (error) {
        console.error(error);
        setStatus(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useCloseModalOnSuccess(`edit_info${labData.id}`, data, formik);
  return (
    <ModalLayout modalId={`edit_info${labData.id}`} title="Update laboratory info">
      <ModalForm
        modalId={`edit_info${labData.id}`}
        formik={formik}
        isError={Boolean(error)}
        isLoading={isPending}
      >
        {/* begin:: laboratory name Input group */}
        <div className="fv-row mb-7 text-start">
          {/* begin::Label */}
          <label className=" fw-bold fs-6 mb-2">Laboratory Title</label>
          {/* end::Label */}

          {/* begin:: Input */}
          <input
            placeholder="Laboratory Title"
            {...formik.getFieldProps("labName")}
            type="text"
            name="labName"
            className={clsx(
              "form-control form-control-solid mb-3 mb-lg-0",
              {
                "is-invalid": formik.touched.labName && formik.errors.labName,
              },
              {
                "is-valid": formik.touched.labName && !formik.errors.labName,
              }
            )}
            autoComplete="off"
            disabled={formik.isSubmitting || isPending}
          />
          {formik.touched.labName && formik.errors.labName && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.labName}</span>
              </div>
            </div>
          )}
          {/* end::Input */}
        </div>
        {/* end::Input group */}

        {/* begin:: full name Input group */}
        <div className="fv-row mb-7  text-start">
          {/* begin::Label */}
          <label className=" fw-bold fs-6 mb-2">Full Name</label>
          {/* end::Label */}

          {/* begin::Input */}
          <input
            placeholder="Full name"
            {...formik.getFieldProps("fullName")}
            type="text"
            name="fullName"
            className={clsx(
              "form-control form-control-solid mb-3 mb-lg-0",
              {
                "is-invalid": formik.touched.fullName && formik.errors.fullName,
              },
              {
                "is-valid": formik.touched.fullName && !formik.errors.fullName,
              }
            )}
            autoComplete="off"
            disabled={formik.isSubmitting || isPending}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.fullName}</span>
              </div>
            </div>
          )}
          {/* end::Input */}
        </div>
        {/* end::Input group */}

        {/* begin:: phone Input group */}
        <div className="fv-row mb-7  text-start">
          {/* begin::Label */}
          <label className=" fw-bold fs-6 mb-2">Phone</label>
          {/* end::Label */}

          {/* begin:: Input */}
          <input
            placeholder="Phone"
            {...formik.getFieldProps("phone")}
            type="number"
            name="phone"
            className={clsx(
              "form-control form-control-solid mb-3 mb-lg-0",
              { "is-invalid": formik.touched.phone && formik.errors.phone },
              {
                "is-valid": formik.touched.phone && !formik.errors.phone,
              }
            )}
            autoComplete="off"
            disabled={formik.isSubmitting || isPending}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.phone}</span>
              </div>
            </div>
          )}
          {/* end::Input */}
        </div>
        {/* end::Input group */}

        {/* begin:: address Input group */}
        <div className="fv-row mb-7  text-start">
          {/* begin::Label */}
          <label className=" fw-bold fs-6 mb-2">Address</label>
          {/* end::Label */}

          {/* begin:: Input */}
          <input
            placeholder="Address"
            {...formik.getFieldProps("address")}
            type="text"
            name="address"
            className={clsx(
              "form-control form-control-solid mb-3 mb-lg-0",
              {
                "is-invalid": formik.touched.address && formik.errors.address,
              },
              {
                "is-valid": formik.touched.address && !formik.errors.address,
              }
            )}
            autoComplete="off"
            disabled={formik.isSubmitting || isPending}
          />
          {formik.touched.address && formik.errors.address && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.address}</span>
              </div>
            </div>
          )}
          {/* end::Input */}
        </div>
        {/* end::Input group */}

        {/* begin:: description Input group */}
        <div className="fv-row mb-7  text-start">
          {/* begin::Label */}
          <label className="fw-bold fs-6 mb-2">Description</label>
          {/* end::Label */}

          {/* begin:: Input */}
          <textarea
            placeholder="Description"
            {...formik.getFieldProps("description")}
            name="description"
            className={clsx(
              "form-control form-control-solid mb-3 mb-lg-0",
              {
                "is-invalid":
                  formik.touched.description && formik.errors.description,
              },
              {
                "is-valid":
                  formik.touched.description && !formik.errors.description,
              }
            )}
            autoComplete="off"
            disabled={formik.isSubmitting || isPending}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.description}</span>
              </div>
            </div>
          )}
          {/* end::Input */}
        </div>
        {/* end::Input group */}

        {/* begin:: username Input group */}
        <div className="fv-row mb-7  text-start">
          {/* begin::Label */}
          <label className=" fw-bold fs-6 mb-2">Username</label>
          {/* end::Label */}

          {/* begin::Input */}
          <input
            placeholder="Username"
            {...formik.getFieldProps("username")}
            className={clsx(
              "form-control form-control-solid mb-3 mb-lg-0",
              {
                "is-invalid": formik.touched.username && formik.errors.username,
              },
              {
                "is-valid": formik.touched.username && !formik.errors.username,
              }
            )}
            type="username"
            name="username"
            autoComplete="off"
            disabled={formik.isSubmitting || isPending}
          />
          {/* end::Input */}
          {formik.touched.username && formik.errors.username && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.username}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Input group */}

        {/* begin::password Input group */}
        <div className="fv-row mb-7  text-start">
          {/* begin::Label */}
          <label className=" fw-bold fs-6 mb-2">Password</label>
          {/* end::Label */}

          {/* begin::Input */}
          <div className="input-group">
            <input
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
                }
              )}
              type={showPasswprd ? "text" : "password"}
              name="password"
              autoComplete="off"
              disabled={formik.isSubmitting || isPending}
            />
            <div className="input-group-append">
              <span
                className="btn btn-icon border"
                onClick={() => setShowPassword((currentMode) => !currentMode)}
              >
                <KTIcon
                  iconName={showPasswprd ? "eye-slash" : "eye"}
                  className="fs-1 "
                />
              </span>
            </div>
          </div>

          {/* end::Input */}
          {formik.touched.password && formik.errors.password && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Input group */}

        {/* begin::confirm password Input group */}
        <div className="fv-row mb-7  text-start">
          {/* begin::Label */}
          <label className=" fw-bold fs-6 mb-2">Confirm Password</label>
          {/* end::Label */}

          {/* begin::Input */}
          <div className="input-group">
            <input
              placeholder="Confirm Password"
              {...formik.getFieldProps("password_confirmation")}
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                {
                  "is-invalid":
                    formik.touched.password_confirmation &&
                    formik.errors.password_confirmation,
                },
                {
                  "is-valid":
                    formik.touched.password_confirmation &&
                    !formik.errors.password_confirmation,
                }
              )}
              type={showPasswprd ? "text" : "password"}
              name="password_confirmation"
              autoComplete="off"
              disabled={formik.isSubmitting || isPending}
            />
            <div className="input-group-append">
              <span
                className="btn btn-icon border"
                onClick={() => setShowPassword((currentMode) => !currentMode)}
              >
                <KTIcon
                  iconName={showPasswprd ? "eye-slash" : "eye"}
                  className="fs-1 "
                />
              </span>
            </div>
          </div>

          {/* end::Input */}
          {formik.touched.password_confirmation &&
            formik.errors.password_confirmation && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">
                    {formik.errors.password_confirmation}
                  </span>
                </div>
              </div>
            )}
        </div>
        {/* end::Input group */}
      </ModalForm>
    </ModalLayout>
  );
};

export { EditInfo };
