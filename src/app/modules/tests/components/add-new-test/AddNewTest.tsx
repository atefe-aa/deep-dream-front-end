import { FC, useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../../ui/modals/ModalForm";
import { LaboratoryInput } from "./components/LaboratoryInput";
import { TestTypeInput } from "./components/TestTypeInput";
import { useCreateRegistration } from "../../hooks/useCreateRegistration";

const addSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  nationalId: Yup.number()
    .min(1000000000, "The national ID format is wrong.")
    .max(9999999999, "The national ID format is wrong."),
  age: Yup.number().min(1, "Minimum age is 1 ").required("Age is required"),
  ageUnit: Yup.string().required("Age type is required"),
  gender: Yup.string().required("Gender is required"),
  testType: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(7, "Maximum 7 symbols")
    .required("Test Type is required"),
  laboratoryId: Yup.string().required("Laboratory is required"),
  discription: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(300, "Maximum 300 symbols"),
  senderRegisterCode: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(10, "Maximum 300 symbols"),
});

const initialValues = {
  name: "",
  nationalId: "",
  age: "",
  doctorName: "",
  ageUnit: "year" as "year" | "day",
  gender: "female" as "female" | "male",
  testType: 0,
  laboratoryId: 0,
  description: "",
  senderRegisterCode: "",
  isMultiSlide: false,
  numberOfSlides: 1,
};

const AddNewTest: FC = () => {
  const { isCreating, createRegistration, data } = useCreateRegistration();
  const [qrCode, setQrCode] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
 
       createRegistration(values);
        if(!isCreating && data){
          setQrCode(data.data.id);
             // TODO: Add label printer logic here
        } 
      } catch (error) {
        console.error(error);
        setStatus("The login details are incorrect");
        setSubmitting(false);
      }
    },
  });

  return (
    <ModalLayout modalId="kt_modal_add_new_test" title="Add New Test">
      {!isCreating && data ? (
        <span>Price: {data?.data.price} (R)</span>
      ) : (
        <ModalForm
          isError={false}
          isLoading={isCreating}
          modalId="kt_modal_add_new_test"
          formik={formik}
        >
          {/* begin::Form group */}
          <LaboratoryInput formik={formik} />
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className="fv-row mb-3">
            <label className="form-label fs-6 fw-bolder text-gray-900">
              Doctor Name
            </label>

            <input
              placeholder="Doctor Name"
              {...formik.getFieldProps("doctorName")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.doctorName && formik.errors.doctorName,
                },
                {
                  "is-valid":
                    formik.touched.doctorName && !formik.errors.doctorName,
                }
              )}
              type="text"
              autoComplete="on"
            />
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className="fv-row mb-3">
            <label className="form-label fs-6 fw-bolder text-gray-900">
              Sender Registration Code
            </label>

            <input
              placeholder="Sender Registration Code"
              {...formik.getFieldProps("senderRegisterCode")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.senderRegisterCode &&
                    formik.errors.senderRegisterCode,
                },
                {
                  "is-valid":
                    formik.touched.senderRegisterCode &&
                    !formik.errors.senderRegisterCode,
                }
              )}
              type="text"
              autoComplete="on"
            />
            {formik.touched.senderRegisterCode &&
              formik.errors.senderRegisterCode && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    <span role="alert">{formik.errors.senderRegisterCode}</span>
                  </div>
                </div>
              )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group / Fullname*/}
          <div className="fv-row mb-3">
            <label className="form-label required fs-6 fw-bolder text-gray-900">
              Patient's Full Name
            </label>
            <input
              placeholder="Full Name"
              {...formik.getFieldProps("name")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid": formik.touched.name && formik.errors.name,
                },
                {
                  "is-valid": formik.touched.name && !formik.errors.name,
                }
              )}
              type="text"
              name="name"
              autoComplete="on"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.name}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group / national id*/}
          <div className="fv-row mb-3">
            <label className="form-label required fs-6 fw-bolder text-gray-900">
              National ID
            </label>
            <input
              placeholder="National ID"
              {...formik.getFieldProps("nationalId")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.nationalId && formik.errors.nationalId,
                },
                {
                  "is-valid":
                    formik.touched.nationalId && !formik.errors.nationalId,
                }
              )}
              type="number"
              name="nationalId"
              autoComplete="on"
            />
            {formik.touched.nationalId && formik.errors.nationalId && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.nationalId}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group / Age */}
          <div className="fv-row mb-3 ">
            <label className="form-label required fw-bolder text-gray-900 fs-6 mb-0">
              Age
            </label>
            <div className="input-group">
              <input
                type="number"
                min={1}
                inputMode="numeric"
                autoComplete="on"
                placeholder="Age"
                {...formik.getFieldProps("age")}
                className={clsx(
                  "form-control bg-transparent",
                  {
                    "is-invalid": formik.touched.age && formik.errors.age,
                  },
                  {
                    "is-valid": formik.touched.age && !formik.errors.age,
                  }
                )}
              />
              <select
                {...formik.getFieldProps("ageUnit")}
                aria-label="Select age unit"
                className="form-select-lg"
                name="ageUnit"
              >
                <option value="year">Year</option>
                <option value="day">Day</option>
              </select>
            </div>

            {formik.touched.age && formik.errors.age && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.age}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group /gender */}
          <div className="fv-row mb-3">
            <label className="required form-label fw-bolder text-gray-900 fs-6 mb-0">
              Gender
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
              <label className="radio">
                <input
                  type="radio"
                  className="me-2"
                  {...formik.getFieldProps("gender")}
                  value="female"
                  checked={formik.values.gender === "female"}
                />
                Female
              </label>
              <label className="radio">
                <input
                  type="radio"
                  {...formik.getFieldProps("gender")}
                  className="ms-5 me-2"
                  value="male"
                  checked={formik.values.gender === "male"}
                />
                Male
              </label>
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

          {/* begin::Form group/ test type */}
          <TestTypeInput formik={formik} />
          {/* end::Form group */}

          {/* begin::Form group/ multi-slide */}
          <div className="fv-row mb-3">
            <div className="d-flex align-items-center">
              <label className="min-w-100px form-label fw-bolder text-gray-900 fs-6 mb-0 me-2">
                Multi-Slide:
              </label>
              <div className="form-check form-check-custom form-check-solid form-switch me-6">
                <input
                  className="form-check-input"
                  type="checkbox"
                  {...formik.getFieldProps("isMultiSlide")}
                  name="isMultiSlide"
                />
              </div>
              {formik.values.isMultiSlide && (
                <>
                  <label className="min-w-100px form-label fw-bolder text-gray-900 fs-6 mb-0 me-2">
                    Slides Number:
                  </label>

                  <input
                    className={clsx(
                      "form-control bg-transparent",
                      {
                        "is-invalid":
                          formik.touched.nationalId && formik.errors.nationalId,
                      },
                      {
                        "is-valid":
                          formik.touched.nationalId &&
                          !formik.errors.nationalId,
                      }
                    )}
                    min={1}
                    type="number"
                    {...formik.getFieldProps("numberOfSlides")}
                    name="numberOfSlides"
                  />
                </>
              )}
            </div>

            {formik.touched.numberOfSlides && formik.errors.numberOfSlides && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.numberOfSlides}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className="fv-row mb-3">
            <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
              Description
            </label>
            <textarea
              autoComplete="on"
              {...formik.getFieldProps("description")}
              className="form-control bg-transparent"
              style={{ minHeight: "150px" }}
            />
          </div>
          {/* end::Form group */}
        </ModalForm>
      )}
    </ModalLayout>
  );
};

export { AddNewTest };
