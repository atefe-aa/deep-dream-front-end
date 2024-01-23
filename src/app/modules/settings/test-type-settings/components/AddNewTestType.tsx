import { FC } from "react";

import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../ui/modals/ModalLayout";
import Checkbox from "../../components/Checkbox";
import { ModalForm } from "../../../../ui/modals/ModalForm";
import SettingFormGroup from "../../components/SettingFormGroup";

const addSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Title is required"),
  code: Yup.number().required("Test code is required."),
  type: Yup.string().required("Type is required"),
  sex: Yup.string().required("Gender is required"),
  discription: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(300, "Maximum 300 symbols"),
});

const initialValues = {
  title: "",
  code: "",
  type: "",
  sex: "",
  description: "",
  numberOfLayers: "",
  steps: "",
  microSteps: "",
  z: "",
  brightness: "",
  condenseur: "",
  multiLayer: false,
  mag4x: false,
  mag10x: false,
  mag40x: false,
  mag100x: false,
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

const AddNewTestType: FC = () => {
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
    <ModalLayout modalId="kt_modal_add_new_test_type" title="Add New Test Type">
      <ModalForm  isError={false} isLoading={false}  modalId="kt_modal_add_new_test_type" formik={formik}>
        {/* begin::Title Form group */}
        <div className="fv-row mb-3">
          <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Test Title<span className="text-danger">*</span>
          </label>

          <input
            placeholder="Test Type Title"
            {...formik.getFieldProps("title")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.title && formik.errors.title,
              },
              {
                "is-valid": formik.touched.title && !formik.errors.title,
              }
            )}
            name="title"
            type="text"
            autoComplete="off"
          />

          {formik.touched.title && formik.errors.title && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.title}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
        {/* begin::code Form group  */}
        <div className="fv-row mb-3">
          <label className="form-label fs-6 fw-bolder text-gray-900">
            Code <span className="text-danger">*</span>
          </label>
          <input
            placeholder="Test Code"
            {...formik.getFieldProps("code")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.code && formik.errors.code,
              },
              {
                "is-valid": formik.touched.code && !formik.errors.code,
              }
            )}
            type="number"
            name="code"
            autoComplete="off"
          />
          {formik.touched.code && formik.errors.code && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.code}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
        {/* begin::sex Form group */}
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
            <select
              {...formik.getFieldProps("sex")}
              className={clsx(
                "form-select",
                {
                  "is-invalid": formik.touched.sex && formik.errors.sex,
                },
                {
                  "is-valid": formik.touched.sex && !formik.errors.sex,
                }
              )}
              aria-label="Select Laboratory Title"
            >
              <option>Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="both">Both</option>
            </select>
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
        {/* begin::type Form group */}
        <div className="fv-row mb-3">
          <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Type<span className="text-danger">*</span>
          </label>
          <div
            className={clsx(
              "mt-3 mb-5 bg-transparent",
              {
                "is-invalid": formik.touched.type && formik.errors.type,
              },
              {
                "is-valid": formik.touched.type && !formik.errors.type,
              }
            )}
          >
            <select
              {...formik.getFieldProps("type")}
              className={clsx(
                "form-select",
                {
                  "is-invalid": formik.touched.sex && formik.errors.sex,
                },
                {
                  "is-valid": formik.touched.sex && !formik.errors.sex,
                }
              )}
              aria-label="Select Laboratory Title"
            >
              <option>Choose Type</option>
              <option value="optical">Optical</option>
              <option value="flourescent">Flourescent</option>
              <option value="invert">Invert</option>
            </select>
          </div>
          {formik.touched.type && formik.errors.type && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.type}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
        <Checkbox formik={formik} label="Multi-layer" inputName="multiLayer" />
        {formik.values.multiLayer && (
          <>
            <SettingFormGroup
              fullWidth={true}
              label="Number Of Layers"
              type="number"
              placeHolder="Number Of Layers"
              inputName="numberOfLayers"
              formik={formik}
            />
            <SettingFormGroup
              fullWidth={true}
              label="Steps"
              type="number"
              placeHolder="Steps"
              inputName="steps"
              formik={formik}
            />
            <SettingFormGroup
              fullWidth={true}
              label="Micro Steps (mm)"
              type="number"
              placeHolder="Micro Steps (mm)"
              inputName="microSteps"
              formik={formik}
            />
          </>
        )}
        <SettingFormGroup
          required={false}
          fullWidth={true}
          label="Z"
          type="number"
          placeHolder="Z"
          inputName="z"
          formik={formik}
        />
        <SettingFormGroup
          required={false}
          fullWidth={true}
          label="Brightness"
          type="number"
          placeHolder="Brightness"
          inputName="brightness"
          formik={formik}
        />
        <SettingFormGroup
          required={false}
          fullWidth={true}
          label="Condenseur"
          type="number"
          placeHolder="Condenseur"
          inputName="condenseur"
          formik={formik}
        />
        {/* begin:: description Form group */}
        <div className="fv-row mb-3">
          <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Description
          </label>
          <textarea
            autoComplete="off"
            {...formik.getFieldProps("description")}
            className="form-control bg-transparent"
            style={{ minHeight: "150px" }}
          />
        </div>
        {/* end::Form group */}
        <div className="d-flex align-items-center justify-content-between my-6">
          <Checkbox label="4x" inputName="mag4x" formik={formik} />
          <Checkbox label="10x" inputName="mag10x" formik={formik} />
          <Checkbox label="40x" inputName="mag40x" formik={formik} />
          <Checkbox label="100x" inputName="mag100x" formik={formik} />
        </div>
      </ModalForm>
    </ModalLayout>
  );
};

export { AddNewTestType };
