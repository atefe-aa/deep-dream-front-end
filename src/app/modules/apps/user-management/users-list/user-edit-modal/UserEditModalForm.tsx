import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  KTIcon,
  isNotEmpty,
  toAbsoluteUrl,
} from "../../../../../../_metronic/helpers";
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
  password: Yup.string()
    .min(7, "Password must be at least 7 charecter")
    .required("Password is required."),
  confirm_password: Yup.string()
    .min(7, "Password must be at least 7 charecter")
    .required("Confirm the password."),
});

const UserEditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const [showPasswprd, setShowPassword] = useState(false);

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
    password: "",
    confirm_password: "",
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
                disabled={formik.isSubmitting || isUserLoading}
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
            <div className="input-group">
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
                type={showPasswprd ? "text" : "password"}
                name="confirm_password"
                autoComplete="off"
                disabled={formik.isSubmitting || isUserLoading}
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
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <div className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.confirm_password}</span>
                </div>
              )}
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
