import { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";

import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import QRCodeGenerator from "./QRCodeGenerator";
import { LABS_TESTS_DATA, TEST_TYPES } from "../../../utils/constants";
import Select from "react-select";
import { ModalLayout } from "../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../ui/modals/ModalForm";

const addSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  nationalId: Yup.number()
    .min(1000000000, "The national ID format is wrong.")
    .max(9999999999, "The national ID format is wrong."),
  age: Yup.number().min(1, "Minimum age is 1 ").required("Age is required"),
  ageType: Yup.string().required("Age type is required"),
  sex: Yup.string().required("Gender is required"),
  testType: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(7, "Maximum 7 symbols")
    .required("Test Type is required"),
  laboratory: Yup.string()
    .min(1, "Minimum 3 symbols")
    .max(20, "Maximum 20 symbols")
    .required("Laboratory title is required"),
  discription: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(300, "Maximum 300 symbols"),
  labNumber: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(10, "Maximum 300 symbols"),
});

const initialValues = {
  name: "",
  nationalId: "",
  age: "",
  ageType: "year",
  sex: "",
  testType: 0,
  laboratory: "",
  description: "",
  labNumber: "",
  multiSlide: {
    isMultiSlide: false,
    numberOfSlides: 1,
  },
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

const AddNewTest: FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [testNumber, setTestNumber] = useState<string>("");

  const sortedLabsData = [...LABS_TESTS_DATA].sort((a, b) =>
    a.labName.localeCompare(b.labName)
  );

  const sortedTestTypes = [...TEST_TYPES].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const testTypeOptions = TEST_TYPES.map((test) => ({
    value: test.id,
    label: `${test.code} - ${test.title}`,
  }));
  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        console.log(values);
        setTestNumber("73578");
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
    <ModalLayout modalId="kt_modal_add_new_test" title="Add New Test">
      <ModalForm modalId="kt_modal_add_new_test" formik={formik}>
        {/* begin::Form group */}
        <div className="fv-row mb-3">
          <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Sender Laboratory<span className="text-danger">*</span>
          </label>
          <select
            {...formik.getFieldProps("laboratory")}
            className={clsx(
              "form-select",
              {
                "is-invalid":
                  formik.touched.laboratory && formik.errors.laboratory,
              },
              {
                "is-valid":
                  formik.touched.laboratory && !formik.errors.laboratory,
              }
            )}
            aria-label="Select Laboratory Title"
          >
            <option>Choose Laboratory</option>
            {sortedLabsData.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.labName}
              </option>
            ))}
          </select>

          {formik.touched.laboratory && formik.errors.laboratory && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.laboratory}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className="fv-row mb-3">
          <label className="form-label fs-6 fw-bolder text-gray-900">
            {
              LABS_TESTS_DATA.find(
                (lab) => lab.id === Number(formik.values.laboratory)
              )?.labName
            }
            Laboratory Number
          </label>

          <input
            placeholder="Laboratory Number"
            {...formik.getFieldProps("labNumber")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.labNumber && formik.errors.labNumber,
              },
              {
                "is-valid":
                  formik.touched.labNumber && !formik.errors.labNumber,
              }
            )}
            type="text"
            autoComplete="off"
          />
          {formik.touched.labNumber && formik.errors.labNumber && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.labNumber}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group / Fullname*/}
        <div className="fv-row mb-3">
          <label className="form-label fs-6 fw-bolder text-gray-900">
            Patient's Full Name <span className="text-danger">*</span>
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
            autoComplete="off"
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
          <label className="form-label fs-6 fw-bolder text-gray-900">
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
            autoComplete="off"
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
          <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Age<span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <input
              type="number"
              min={1}
              inputMode="numeric"
              autoComplete="off"
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
              {...formik.getFieldProps("ageType")}
              aria-label="Select age type"
              className="form-select-lg"
              name="ageType"
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
            <label className="radio">
              <input
                type="radio"
                {...formik.getFieldProps("sex")}
                value="1"
                checked={formik.values.sex === "1"}
              />
              Female
            </label>
            <label className="radio">
              <input
                type="radio"
                {...formik.getFieldProps("sex")}
                className="ms-5"
                value="2"
                checked={formik.values.sex === "2"}
              />
              Male
            </label>
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

        {/* begin::Form group/ test type */}
        <div className="fv-row mb-3">
          <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Test Type<span className="text-danger">*</span>
          </label>
          <Select
            {...formik.getFieldProps("testType")}
            theme={(theme) => ({
              ...theme,
              borderRadius: 7,
              colors: {
                ...theme.colors,
                primary25: "var(--bs-success-text-emphasis)",
                neutral0: "var(--bs-modal-bg)",
                neutral20: "var(--bs-gray-300)",
                neutral80: "var(--bs-gray-700)",
              },
            })}
            options={testTypeOptions}
            isSearchable={true}
            placeholder="Choose the test type"
            onChange={(option) =>
              formik.setFieldValue("testType", option?.value)
            }
            value={testTypeOptions.find(
              (test) => test.value === Number(formik.values.testType)
            )}
          />

          {formik.touched.testType && formik.errors.testType && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.testType}</span>
              </div>
            </div>
          )}
        </div>
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
                {...formik.getFieldProps("multiSlide.isMultiSlide")}
                name="multiSlide.isMultiSlide"
              />
            </div>
            {formik.values.multiSlide.isMultiSlide && (
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
                        formik.touched.nationalId && !formik.errors.nationalId,
                    }
                  )}
                  min={1}
                  type="number"
                  {...formik.getFieldProps("multiSlide.numberOfSlides")}
                  name="multiSlide.numberOfSlides"
                />
              </>
            )}
          </div>

          {formik.touched.multiSlide?.numberOfSlides &&
            formik.errors.multiSlide?.numberOfSlides && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">
                    {formik.errors.multiSlide?.numberOfSlides}
                  </span>
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
            autoComplete="off"
            {...formik.getFieldProps("description")}
            className="form-control bg-transparent"
            style={{ minHeight: "150px" }}
          />
        </div>
        {/* end::Form group */}
      </ModalForm>
    </ModalLayout>
  );
};

export { AddNewTest };
