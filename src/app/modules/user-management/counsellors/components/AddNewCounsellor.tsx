import { FC } from "react";

import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../../ui/modals/ModalForm";
import { useAuth } from "../../../auth";
import { hasRole } from "../../../../utils/helper";
import { useCreateCounsellor } from "../hooks/useCreateCounsellor";
import { LaboratoryInput } from "../../../tests/components/add-new-test/components/LaboratoryInput";
import { useCloseModalOnSuccess } from "../../../hooks/useCloseModalOnSuccess";

const AddNewCounsellor: FC = () => {
  const { currentUser } = useAuth();
  const isSuperAdmin = currentUser && hasRole(currentUser, ["superAdmin"]);

  const initialValues = {
    id: 0,
    name: "",
    description: "",
    phone: "",
    ...(isSuperAdmin && { laboratoryId: undefined }), // Add labId for superAdmin
  };

  const addSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Name is required"),
    phone: Yup.string()
      .min(11, "Invalid phone number")
      .max(15, "Invalid phone number")
      .required("Phone is required")
      .matches(
        /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/,
        "Invalid phone number"
      ),
    description: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(200, "Maximum 200 symbols"),
    ...(isSuperAdmin && {
      laboratoryId: Yup.number()
        .min(1, "Laboratory is required.")
        .required("Laboratory is required"),
    }),
  });

  const { isCreating, createCounsellor, data } = useCreateCounsellor();

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {

        createCounsellor(values);
      } catch (error) {
        console.error(error);
        setStatus("Creating counsellor failed.");
        setSubmitting(false);
      }
    },
  });

  useCloseModalOnSuccess("kt_modal_add_new_counsellor", data, formik);

  return (
    <ModalLayout
      modalId="kt_modal_add_new_counsellor"
      title="Add new counsellor"
    >
      <ModalForm
        isError={false}
        isLoading={isCreating}
        modalId="kt_modal_add_new_counsellor"
        formik={formik}
      >
        {isSuperAdmin && <LaboratoryInput formik={formik} />}

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
            autoComplete="on"
            disabled={formik.isSubmitting || isCreating}
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
            type="text"
            inputMode="tel"
            name="phone"
            className={clsx(
              "form-control form-control-solid mb-3 mb-lg-0",
              { "is-invalid": formik.touched.phone && formik.errors.phone },
              {
                "is-valid": formik.touched.phone && !formik.errors.phone,
              }
            )}
            autoComplete="on"
            disabled={formik.isSubmitting || isCreating}
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
      </ModalForm>
    </ModalLayout>
  );
};

export { AddNewCounsellor };
