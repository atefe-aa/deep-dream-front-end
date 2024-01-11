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
  isUserLoading: boolean;
  user: User;
};

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  name: Yup.string()
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
    .max(50, "Maximum 50 symbols")
    .required("description is required"),
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
  template: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("template is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 charecter")
    .required("Password is required."),
  confirm_password: Yup.string()
    .min(7, "Password must be at least 7 charecter")
    .required("Confirm the password."),
});

const UserEditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const { setItemIdForUpdate } = useListView();
  const { refetch } = useQueryResponse();

  const [userForEdit] = useState<User>({
    ...user,
    avatar: user.avatar || initialUser.avatar,
    role: user.role || initialUser.role,
    position: user.position || initialUser.position,
    name: user.name || initialUser.name,
    email: user.email || initialUser.email,
  });

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch();
    }
    setItemIdForUpdate(undefined);
  };

  const initialValues = {
    email: "",
    name: "",
    labName: "",
    username: "",
    phone: "",
    address: "",
    description: "",
    signature: "",
    header: "",
    footer: "",
    template: "",
    password: "",
    confirm_password: "",
    role: "Administrator",
  };
  const blankImg = toAbsoluteUrl("/media/svg/avatars/blank.svg");
  const userAvatarImg = toAbsoluteUrl(`/media/${userForEdit.avatar}`);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: editUserSchema,
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
        id="kt_modal_add_user_form"
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        {/* begin::Scroll */}
        <div
          className="d-flex flex-column scroll-y me-n7 pe-7"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          {/* begin:: full name Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">Full Name</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder="Full name"
              {...formik.getFieldProps("name")}
              type="text"
              name="name"
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                { "is-invalid": formik.touched.name && formik.errors.name },
                {
                  "is-valid": formik.touched.name && !formik.errors.name,
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.name}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
          {/* end::Input group */}

          {/* begin:: labratory name Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">
              Labratory Title
            </label>
            {/* end::Label */}

            {/* begin:: Input */}
            <input
              placeholder="Labratory Title"
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
              disabled={formik.isSubmitting || isUserLoading}
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

          {/* begin:: phone Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">Phone</label>
            {/* end::Label */}

            {/* begin:: Input */}
            <input
              placeholder="Phone"
              {...formik.getFieldProps("phone")}
              type="tel"
              name="phone"
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                { "is-invalid": formik.touched.phone && formik.errors.phone },
                {
                  "is-valid": formik.touched.phone && !formik.errors.phone,
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
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
              disabled={formik.isSubmitting || isUserLoading}
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
            <label className="required fw-bold fs-6 mb-2">Description</label>
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
              disabled={formik.isSubmitting || isUserLoading}
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
              disabled={formik.isSubmitting || isUserLoading}
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
              disabled={formik.isSubmitting || isUserLoading}
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
            <label className="required fw-bold fs-6 mb-2">Footer</label>
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
              disabled={formik.isSubmitting || isUserLoading}
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

          {/* begin:: template Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">Template</label>
            {/* end::Label */}

            {/* begin:: Input */}
            <input
              placeholder="template"
              {...formik.getFieldProps("template")}
              type="file"
              name="template"
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                {
                  "is-invalid":
                    formik.touched.template && formik.errors.template,
                },
                {
                  "is-valid":
                    formik.touched.template && !formik.errors.template,
                }
              )}
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.template && formik.errors.template && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.template}</span>
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
                  "is-invalid":
                    formik.touched.username && formik.errors.username,
                },
                {
                  "is-valid":
                    formik.touched.username && !formik.errors.username,
                }
              )}
              type="username"
              name="username"
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.username && formik.errors.username && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.username}</span>
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
              type="password"
              name="password"
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <span role="alert">{formik.errors.password}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}

          {/* begin::confirm password Input group */}
          <div className="fv-row mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-2">
              Confirm Password
            </label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirm_password")}
              className={clsx(
                "form-control form-control-solid mb-3 mb-lg-0",
                {
                  "is-invalid":
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password,
                },
                {
                  "is-valid":
                    formik.touched.confirm_password &&
                    !formik.errors.confirm_password,
                }
              )}
              type="password"
              name="confirm_password"
              autoComplete="off"
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.confirm_password}</span>
                </div>
              )}
          </div>
          {/* end::Input group */}

          {/* begin::Input group */}
          <div className="mb-7">
            {/* begin::Label */}
            <label className="required fw-bold fs-6 mb-5">Role</label>
            {/* end::Label */}
            {/* begin::Roles */}
            {/* begin::Input row */}
            <div className="d-flex fv-row">
              {/* begin::Radio */}
              <div className="form-check form-check-custom form-check-solid">
                {/* begin::Input */}
                <input
                  className="form-check-input me-3"
                  {...formik.getFieldProps("role")}
                  name="role"
                  type="radio"
                  value="Administrator"
                  id="kt_modal_update_role_option_0"
                  checked={formik.values.role === "Administrator"}
                  disabled={formik.isSubmitting || isUserLoading}
                />

                {/* end::Input */}
                {/* begin::Label */}
                <label
                  className="form-check-label"
                  htmlFor="kt_modal_update_role_option_0"
                >
                  <div className="fw-bolder text-gray-800">Administrator</div>
                  <div className="text-gray-600">
                    Best for business owners and company administrators
                  </div>
                </label>
                {/* end::Label */}
              </div>
              {/* end::Radio */}
            </div>
            {/* end::Input row */}
            <div className="separator separator-dashed my-5"></div>
            {/* begin::Input row */}
            <div className="d-flex fv-row">
              {/* begin::Radio */}
              <div className="form-check form-check-custom form-check-solid">
                {/* begin::Input */}
                <input
                  className="form-check-input me-3"
                  {...formik.getFieldProps("role")}
                  name="role"
                  type="radio"
                  value="Developer"
                  id="kt_modal_update_role_option_1"
                  checked={formik.values.role === "Developer"}
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {/* end::Input */}
                {/* begin::Label */}
                <label
                  className="form-check-label"
                  htmlFor="kt_modal_update_role_option_1"
                >
                  <div className="fw-bolder text-gray-800">Developer</div>
                  <div className="text-gray-600">
                    Best for developers or people primarily using the API
                  </div>
                </label>
                {/* end::Label */}
              </div>
              {/* end::Radio */}
            </div>
            {/* end::Input row */}
            <div className="separator separator-dashed my-5"></div>
            {/* begin::Input row */}
            <div className="d-flex fv-row">
              {/* begin::Radio */}
              <div className="form-check form-check-custom form-check-solid">
                {/* begin::Input */}
                <input
                  className="form-check-input me-3"
                  {...formik.getFieldProps("role")}
                  name="role"
                  type="radio"
                  value="Analyst"
                  id="kt_modal_update_role_option_2"
                  checked={formik.values.role === "Analyst"}
                  disabled={formik.isSubmitting || isUserLoading}
                />

                {/* end::Input */}
                {/* begin::Label */}
                <label
                  className="form-check-label"
                  htmlFor="kt_modal_update_role_option_2"
                >
                  <div className="fw-bolder text-gray-800">Analyst</div>
                  <div className="text-gray-600">
                    Best for people who need full access to analytics data, but
                    don't need to update business settings
                  </div>
                </label>
                {/* end::Label */}
              </div>
              {/* end::Radio */}
            </div>
            {/* end::Input row */}
            <div className="separator separator-dashed my-5"></div>
            {/* begin::Input row */}
            <div className="d-flex fv-row">
              {/* begin::Radio */}
              <div className="form-check form-check-custom form-check-solid">
                {/* begin::Input */}
                <input
                  className="form-check-input me-3"
                  {...formik.getFieldProps("role")}
                  name="role"
                  type="radio"
                  value="Support"
                  id="kt_modal_update_role_option_3"
                  checked={formik.values.role === "Support"}
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {/* end::Input */}
                {/* begin::Label */}
                <label
                  className="form-check-label"
                  htmlFor="kt_modal_update_role_option_3"
                >
                  <div className="fw-bolder text-gray-800">Support</div>
                  <div className="text-gray-600">
                    Best for employees who regularly refund payments and respond
                    to disputes
                  </div>
                </label>
                {/* end::Label */}
              </div>
              {/* end::Radio */}
            </div>
            {/* end::Input row */}
            <div className="separator separator-dashed my-5"></div>
            {/* begin::Input row */}
            <div className="d-flex fv-row">
              {/* begin::Radio */}
              <div className="form-check form-check-custom form-check-solid">
                {/* begin::Input */}
                <input
                  className="form-check-input me-3"
                  {...formik.getFieldProps("role")}
                  name="role"
                  type="radio"
                  id="kt_modal_update_role_option_4"
                  value="Trial"
                  checked={formik.values.role === "Trial"}
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {/* end::Input */}
                {/* begin::Label */}
                <label
                  className="form-check-label"
                  htmlFor="kt_modal_update_role_option_4"
                >
                  <div className="fw-bolder text-gray-800">Trial</div>
                  <div className="text-gray-600">
                    Best for people who need to preview content data, but don't
                    need to make any updates
                  </div>
                </label>
                {/* end::Label */}
              </div>
              {/* end::Radio */}
            </div>
            {/* end::Input row */}
            {/* end::Roles */}
          </div>
          {/* end::Input group */}
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => cancel()}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={
              isUserLoading ||
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched
            }
          >
            <span className="indicator-label">Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  );
};

export { UserEditModalForm };
