import { FC } from "react";

import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../ui/modals/ModalLayout";
import Checkbox from "../../components/Checkbox";
import { ModalForm } from "../../../../ui/modals/ModalForm";
import { useCreateTestType } from "../hooks/useCreateTestType";
import { useCloseModalOnSuccess } from "../../../hooks/useCloseModalOnSuccess";
import { TemplateInput } from "./TemplateInput";

const addSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Title is required"),
  code: Yup.string().required("Test code is required."),
  type: Yup.string().required("Type is required"),
  template: Yup.string().required("Template is required"),
  gender: Yup.string().required("Gender is required"),
  discription: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(300, "Maximum 300 symbols"),
  brightness: Yup.number()
    .min(0, "Percentage must be a positive number.")
    .max(100, "Percentage must be 100 or less."),
  magnification: Yup.string().required("Magnification is required"),
  numberOfLayers: Yup.number()
    .min(1, "Number of layers is at leat 1.")
    .test(
      "is-odd",
      "Number of layers must be odd.",
      (value): value is number => typeof value === "number" && value % 2 !== 0
    ),
});

const initialValues = {
  title: "",
  code: "",
  type: "optical" as "optical" | "invert" | "fluorescent",
  gender: "both" as "male" | "female" | "both",
  description: "",
  template: undefined as unknown as number,
  numberOfLayers: 1,
  step: "" as unknown as number,
  microStep: "" as unknown as number,
  z: "" as unknown as number,
  brightness: "" as unknown as number,
  condenser: "" as unknown as number,
  multiLayer: false,
  magnification: 2 as 2 | 10 | 40 | 100,
};

const AddNewTestType: FC = () => {
  const { createTestType, isCreating, data } = useCreateTestType();

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        createTestType(values);
      } catch (error) {
        console.error(error);
        setStatus(
          "There was an error creating new test type. Please Try again later."
        );
        setSubmitting(false);
      }
    },
  });

  useCloseModalOnSuccess("kt_modal_add_new_test_type", data, formik);

  return (
    <ModalLayout modalId="kt_modal_add_new_test_type" title="Add New Test Type">
      <ModalForm
        isError={false}
        isLoading={isCreating}
        modalId="kt_modal_add_new_test_type"
        formik={formik}
      >
        {/* begin::Title Form group */}
        <div className="fv-row mb-3">
          <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Test Title<span className="text-danger">*</span>
          </label>

          <input
            disabled={isCreating}
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

        <TemplateInput formik={formik} />

        {/* begin::code Form group  */}
        <div className="fv-row mb-3">
          <label className="form-label fs-6 fw-bolder text-gray-900">
            Code <span className="text-danger">*</span>
          </label>
          <input
            disabled={isCreating}
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
            <div className="fv-row text-start mb-3">
              <label className="form-label fs-6 fw-bolder text-gray-900">
                Number Of Layers
              </label>
              <input
                disabled={isCreating}
                placeholder="Number Of Layers"
                min={1}
                {...formik.getFieldProps("numberOfLayers")}
                className={clsx(
                  "form-control bg-transparent",
                  {
                    "is-invalid":
                      formik.touched.numberOfLayers &&
                      formik.errors.numberOfLayers,
                  },
                  {
                    "is-valid":
                      formik.touched.numberOfLayers &&
                      !formik.errors.numberOfLayers,
                  }
                )}
                type="number"
                name="numberOfLayers"
                autoComplete="off"
              />
              {formik.touched.numberOfLayers &&
                formik.errors.numberOfLayers && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      <span role="alert">{formik.errors.numberOfLayers}</span>
                    </div>
                  </div>
                )}
            </div>

            <div className="fv-row text-start mb-3">
              <label className="form-label fs-6 fw-bolder text-gray-900">
                Step
              </label>
              <input
                disabled={isCreating}
                placeholder="Step"
                min={1}
                {...formik.getFieldProps("step")}
                className={clsx(
                  "form-control bg-transparent",
                  {
                    "is-invalid": formik.touched.step && formik.errors.step,
                  },
                  {
                    "is-valid": formik.touched.step && !formik.errors.step,
                  }
                )}
                type="number"
                name="step"
                autoComplete="off"
              />
              {formik.touched.step && formik.errors.step && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.step}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="fv-row text-start mb-3">
              <label className="form-label fs-6 fw-bolder text-gray-900">
                Micro Step (mm)
              </label>
              <input
                disabled={isCreating}
                placeholder="Micro Step (mm)"
                min={1}
                {...formik.getFieldProps("microStep")}
                className={clsx(
                  "form-control bg-transparent",
                  {
                    "is-invalid":
                      formik.touched.microStep && formik.errors.microStep,
                  },
                  {
                    "is-valid":
                      formik.touched.microStep && !formik.errors.microStep,
                  }
                )}
                type="number"
                name="microStep"
                autoComplete="off"
              />
              {formik.touched.microStep && formik.errors.microStep && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.microStep}</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="fv-row text-start mb-3">
          <label className="form-label fs-6 fw-bolder text-gray-900">Z</label>
          <input
            disabled={isCreating}
            placeholder="Z"
            {...formik.getFieldProps("z")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.z && formik.errors.z,
              },
              {
                "is-valid": formik.touched.z && !formik.errors.z,
              }
            )}
            type="number"
            name="z"
            autoComplete="off"
          />
          {formik.touched.z && formik.errors.z && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.z}</span>
              </div>
            </div>
          )}
        </div>

        <div className="fv-row text-start mb-3">
          <label className="form-label fs-6 fw-bolder text-gray-900">
            Brightness
          </label>
          <input
            disabled={isCreating}
            placeholder="Brightness"
            min={0}
            {...formik.getFieldProps("brightness")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.brightness && formik.errors.brightness,
              },
              {
                "is-valid":
                  formik.touched.brightness && !formik.errors.brightness,
              }
            )}
            type="number"
            name="brightness"
            autoComplete="off"
          />
          {formik.touched.brightness && formik.errors.brightness && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.brightness}</span>
              </div>
            </div>
          )}
        </div>

        <div className="fv-row text-start mb-3">
          <label className="form-label fs-6 fw-bolder text-gray-900">
            Condenser
          </label>
          <input
            disabled={isCreating}
            placeholder="Condenser"
            {...formik.getFieldProps("condenser")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.condenser && formik.errors.condenser,
              },
              {
                "is-valid":
                  formik.touched.condenser && !formik.errors.condenser,
              }
            )}
            type="number"
            name="condenser"
            autoComplete="off"
          />
          {formik.touched.condenser && formik.errors.condenser && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.condenser}</span>
              </div>
            </div>
          )}
        </div>
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
                disabled={isCreating}
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
                disabled={isCreating}
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
                disabled={isCreating}
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
                disabled={isCreating}
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

export { AddNewTestType };
