import { FC, useEffect } from "react";

import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../ui/modals/ModalLayout";
import Checkbox from "../../components/Checkbox";
import { ModalForm } from "../../../../ui/modals/ModalForm";
import SettingFormGroup from "../../components/SettingFormGroup";
import { useCreateTestType } from "../hooks/useCreateTestType";
import { useCloseModalOnSuccess } from "../../../hooks/useCloseModalOnSuccess";
import { useTestType } from "../hooks/useTest Type";
import { useUpdateTestType } from "../hooks/useUpdateTestType";

const addSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Title is required"),
  code: Yup.string().required("Test code is required."),
  type: Yup.string().required("Type is required"),
  gender: Yup.string().required("Gender is required"),
  discription: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(300, "Maximum 300 symbols"),
  magnification: Yup.string().required("Magnification is required"),
  numberOfLayers: Yup.number().min(1,'Number of layers is at leat 1.')
});

const initialValues = {
  title: "",
  code: "",
  type: "optical" as "optical" | "invert" | "fluorescent",
  gender: "both" as "male" | "female" | "both",
  description: "",
  numberOfLayers: 1,
  step: 0,
  microStep: 0,
  z: 0,
  brightness: 0,
  condenser: 0,
  multiLayer: false,
  magnification: 2 as 2 | 10 | 40 | 100,
};
type Props = {
    testTypeId: number;
  };
  
const EditTestType: React.FC<Props> = ({  testTypeId }) => {
    const { isLoading, testType } = useTestType(testTypeId);
    const { updateTestType, isUpdating, data } = useUpdateTestType(testTypeId);
  
    const formik = useFormik({
      initialValues: {
        id:testTypeId,
        title: "",
        code: "",
        type: "optical" as "optical" | "invert" | "fluorescent",
        gender: "both" as "male" | "female" | "both",
        description: "",
        numberOfLayers: 1,
        step: 0,
        microStep: 0,
        z: 0,
        brightness: 0,
        condenser: 0,
        multiLayer: false,
        magnification: 2 as 2 | 10 | 40 | 100,
      },
      validationSchema: addSchema,
      onSubmit: async (values, { setStatus, setSubmitting }) => {
        try {
          updateTestType(values);
        } catch (error) {
          console.error(error);
          setStatus("Somthing went wrong updating test type. Try again later.");
          setSubmitting(false);
        }
      },
    });
    useEffect(() => {
      if (!isLoading && testType) {
        formik.setValues({
          id:testTypeId ,
          title: testType.title || "",
          code: testType.code || "",
          type: testType.type || "optical" as "optical" | "invert" | "fluorescent",
          gender: testType.gender ||  "both" as "male" | "female" | "both",
          description: testType.description || "",
          numberOfLayers: testType.numberOfLayers || 1,
          step: testType.step || 0,
          microStep: testType.microstep || 0,
          z: testType.z || 0,
          brightness: testType.brightness || 0,
          condenser: testType.condenser || 0,
          multiLayer: false ,
          magnification:testType.magnification ||2 as 2 | 10 | 40 | 100,
        });
      }
    }, [isLoading, testType, formik.setValues]);
  
  
    useCloseModalOnSuccess(`edit_test_type_info${testTypeId}`, data, formik);

  return (
    <ModalLayout modalId={`edit_test_type_info${testTypeId}`} title="Add New Test Type">
      <ModalForm
        isError={false}
        isLoading={isUpdating}
        modalId={`edit_test_type_info${testTypeId}`}
        formik={formik}
      >
        {/* begin::Title Form group */}
        <div className="fv-row mb-3">
          <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Test Title<span className="text-danger">*</span>
          </label>

          <input
            disabled={isUpdating}
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
            disabled={isUpdating}
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
            type="text"
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
        {/* begin::gender Form group */}
        <div className="fv-row mb-3">
          <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Gender<span className="text-danger">*</span>
          </label>
          <div
            className={clsx(
              "mt-3 mb-5 bg-transparent",
              {
                "is-invalid": formik.touched.gender && formik.errors.gender,
              },
              {
                "is-valid": formik.touched.gender && !formik.errors.gender,
              }
            )}
          >
            <select
              {...formik.getFieldProps("gender")}
              className={clsx(
                "form-select",
                {
                  "is-invalid": formik.touched.gender && formik.errors.gender,
                },
                {
                  "is-valid": formik.touched.gender && !formik.errors.gender,
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
          {formik.touched.gender && formik.errors.gender && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.gender}</span>
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
                  "is-invalid": formik.touched.gender && formik.errors.gender,
                },
                {
                  "is-valid": formik.touched.gender && !formik.errors.gender,
                }
              )}
              aria-label="Select Laboratory Title"
            >
              <option>Choose Type</option>
              <option value="optical">Optical</option>
              <option value="fluorescent">Fluorescent</option>
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
              label="Number Of Layers"
              type="number"
              placeHolder="Number Of Layers"
              inputName="numberOfLayers"
              formik={formik}
            />
            <SettingFormGroup
              label="Step"
              type="number"
              placeHolder="Step"
              inputName="step"
              formik={formik}
            />
            <SettingFormGroup
              label="Micro Step (mm)"
              type="number"
              placeHolder="Micro Step (mm)"
              inputName="microStep"
              formik={formik}
            />
          </>
        )}
        <SettingFormGroup
          required={false}
          label="Z"
          type="number"
          placeHolder="Z"
          inputName="z"
          formik={formik}
        />
        <SettingFormGroup
          required={false}
          label="Brightness"
          type="number"
          placeHolder="Brightness"
          inputName="brightness"
          formik={formik}
        />
        <SettingFormGroup
          required={false}
          label="Condenser"
          type="number"
          placeHolder="Condenser"
          inputName="condenser"
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

        <div className="d-flex align-items-center justify-content-around my-6">
          <label className=" d-flex align-items-center col-form-label  fw-bold fs-6">
            2x
            <div className="form-check form-check-custom form-check-solid form-switch ms-3">
              <input
                disabled={isUpdating}
                type="radio"
                className="form-check-input"
                name="magnification"
                value={2}
                checked={formik.values.magnification === 2}
                onChange={() => formik.setFieldValue("magnification", 2)}
              />
            </div>
          </label>
          <label className=" d-flex align-items-center col-form-label  fw-bold fs-6">
            10x
            <div className="form-check form-check-custom form-check-solid form-switch ms-3">
              <input
                disabled={isUpdating}
                type="radio"
                className="form-check-input"
                name="magnification"
                value={10}
                checked={formik.values.magnification === 10}
                onChange={() => formik.setFieldValue("magnification", 10)}
              />
            </div>
          </label>
          <label className=" d-flex align-items-center col-form-label  fw-bold fs-6">
            40x
            <div className="form-check form-check-custom form-check-solid form-switch ms-3">
              <input
                disabled={isUpdating}
                type="radio"
                className="form-check-input"
                name="magnification"
                value={40}
                checked={formik.values.magnification === 40}
                onChange={() => formik.setFieldValue("magnification", 40)}
              />
            </div>
          </label>
          <label className=" d-flex align-items-center col-form-label  fw-bold fs-6">
            100x
            <div className="form-check form-check-custom form-check-solid form-switch ms-3">
              <input
                disabled={isUpdating}
                type="radio"
                className="form-check-input"
                name="magnification"
                value={100}
                checked={formik.values.magnification === 100}
                onChange={() => formik.setFieldValue("magnification", 100)}
              />
            </div>
          </label>
        </div>
      </ModalForm>
    </ModalLayout>
  );
};

export { EditTestType };