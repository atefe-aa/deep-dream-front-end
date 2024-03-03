import { FC } from "react";

import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../../../ui/modals/ModalForm";
import { KTIcon, toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import { useCreateLaboratory } from "../../hooks/useCreateLaboratory";
import { LabsModel } from "../../core/_models";
import { useCloseModalOnSuccess } from "../../../../hooks/useCloseModalOnSuccess";

const addSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  labName: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Laboratory Name is required"),
  username: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Username is required"),
  phone: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("phone is required"),
  address: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("address is required"),
  description: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(100, "Maximum 100 symbols"),
  password: Yup.string()
    .min(8, "Password must be at least 7 charecter")
    .required("Password is required."),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .min(8, "Password must be at least 7 charecter")
    .required("Confirm the password."),
  signature: Yup.mixed().required("Signature is required"),
  header: Yup.mixed().required("Signature is required"),
});

let initialValues = {
  fullName: "",
  labName: "",
  username: "",
  phone: "",
  address: "",
  description: "",
  password: "",
  password_confirmation: "",
  avatar: undefined as File | undefined,
  signature: undefined as File | undefined,
  header: undefined as File | undefined,
  footer: undefined as File | undefined,
};

type Props = {
  labData?: LabsModel;
};

const AddNewLaboratory: FC<Props> = () => {
  const { createLaboratory, isCreating, error, data } = useCreateLaboratory();

  const blankImg = toAbsoluteUrl("/media/svg/avatars/blank.svg");
  const [showPasswprd, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      if (error?.message) {
        setStatus(error.message);
      }
      try {
        createLaboratory(values);
      } catch (error) {
        console.error(error);
        setStatus(error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  useCloseModalOnSuccess("kt_modal_add_new_laboratory", data, formik);
  return (
    <ModalLayout
      modalId="kt_modal_add_new_laboratory"
      title="Add new laboratory"
    >
      <ModalForm
        modalId="kt_modal_add_new_laboratory"
        formik={formik}
        isError={Boolean(error)}
        isLoading={isCreating}
      >
        {/* begin::Avatar Input group */}
        <div className="fv-row mb-7">
          {/* begin::Label */}
          <label className="d-block fw-bold fs-6 mb-5">Avatar</label>
          {/* end::Label */}

          {/* begin::Image input */}
          <div
            className="image-input image-input-outline"
            data-kt-image-input="true"
            style={{ backgroundImage: `url('${blankImg}')` }}
          >
            {/* begin::Preview existing avatar */}
            <img
              src={
                formik.values.avatar
                  ? URL.createObjectURL(formik.values.avatar)
                  : blankImg
              }
              alt="Avatar Preview"
              className="image-input-wrapper w-125px h-125px"
            />
            {/* end::Preview existing avatar */}

            {/* begin::Label */}
            <label
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="change"
              data-bs-toggle="tooltip"
              title="Change avatar"
            >
              <i className="bi bi-pencil-fill fs-7"></i>

              <input
                type="file"
                name="avatar"
                accept=".png, .jpg, .jpeg"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    formik.setFieldValue("avatar", file);
                  }
                }}
              />
              <input type="hidden" name="avatar_remove" />
            </label>
            {/* end::Label */}

            {/* begin::Cancel */}
            <span
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="cancel"
              data-bs-toggle="tooltip"
              title="Cancel avatar"
            >
              <i className="bi bi-x fs-2"></i>
            </span>
            {/* end::Cancel */}

            {/* begin::Remove */}
            <span
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="remove"
              data-bs-toggle="tooltip"
              title="Remove avatar"
            >
              <i className="bi bi-x fs-2"></i>
            </span>
            {/* end::Remove */}
          </div>
          {/* end::Image input */}

          {/* begin::Hint */}
          <div className="form-text">Allowed file types: png, jpg, jpeg.</div>
          {/* end::Hint */}
        </div>
        {/* end::Input group */}

        {/* begin:: laboratory name Input group */}
        <div className="fv-row mb-7">
          {/* begin::Label */}
          <label className="required fw-bold fs-6 mb-2">Laboratory Title</label>
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
            disabled={isCreating}
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
        <div className="fv-row mb-7">
          {/* begin::Label */}
          <label className="required fw-bold fs-6 mb-2">Full Name</label>
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
            disabled={isCreating}
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
        <div className="fv-row mb-7">
          {/* begin::Label */}
          <label className="required fw-bold fs-6 mb-2">Phone</label>
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
            disabled={isCreating}
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
        <div className="fv-row mb-7">
          {/* begin::Label */}
          <label className="required fw-bold fs-6 mb-2">Address</label>
          {/* end::Label */}

          {/* begin:: Input */}
          <input
            placeholder="Address"
            {...formik.getFieldProps("name")}
            type="address"
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
            disabled={isCreating}
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
        <div className="fv-row mb-7">
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
            disabled={isCreating}
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
        <div className="fv-row mb-7">
          {/* begin::Label */}
          <label className="required fw-bold fs-6 mb-2">Username</label>
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
            disabled={isCreating}
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
        <div className="fv-row mb-7">
          {/* begin::Label */}
          <label className="required fw-bold fs-6 mb-2">Password</label>
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
              disabled={isCreating}
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
        <div className="fv-row mb-7">
          {/* begin::Label */}
          <label className="required fw-bold fs-6 mb-2">Confirm Password</label>
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
              disabled={isCreating}
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

        {/* begin:: signature Input group */}
        <div className="fv-row mb-7">
          {/* begin::Label */}
          <label className="required fw-bold fs-6 mb-2">Signature</label>
          {/* end::Label */}

          {/* begin:: Input */}
          <input
            placeholder="signature"
            type="file"
            name="signature"
            className="form-control form-control-solid mb-3 mb-lg-0"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (file) {
                formik.setFieldValue("signature", file);
              }
            }}
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
            type="file"
            name="header"
            className="form-control form-control-solid mb-3 mb-lg-0"
            accept=".png, .jpg, .jpeg"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (file) {
                formik.setFieldValue("header", file);
              }
            }}
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
            type="file"
            name="footer"
            className="form-control form-control-solid mb-3 mb-lg-0"
            accept=".png, .jpg, .jpeg"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (file) {
                formik.setFieldValue("footer", file);
              }
            }}
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
      </ModalForm>
    </ModalLayout>
  );
};

export { AddNewLaboratory };
