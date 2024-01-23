
import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../../../ui/modals/ModalForm";
import { TEST_TYPES } from "../../../../../utils/constants";

const addSchema = Yup.object().shape({
  price: Yup.number()
    .min(1, "The min price can't be less than 1")
    .required("Price is required."),
  extraPrice: Yup.number()
    .min(1, "The min price can't be less than 1")
    .required("Price is required."),
  testType: Yup.string().required("Test Type is required"),
});

const initialValues = {
  testType: "",
  price: "",
  extraPrice: "",
  description: "",
};

type Props = {
  labName: string;
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

const AddNewTestPrice: React.FC<Props> = ({ labName }) => {
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
    <ModalLayout
      modalId={`kt_modal_add_new_test_price_${labName.toLowerCase()}`}
      title={`${labName} Laboratory`}
    >
      <ModalForm
        modalId={`kt_modal_add_new_test_price_${labName.toLowerCase()}`}
        formik={formik}
      >
        {/* begin::test type Form group */}
        <div className="fv-row mb-3">
          <label className="form-label required fw-bolder text-gray-900 fs-6 mb-0">
            Test Type
          </label>
          <div
            className={clsx(
              "mt-3 mb-5 bg-transparent",
              {
                "is-invalid": formik.touched.testType && formik.errors.testType,
              },
              {
                "is-valid": formik.touched.testType && !formik.errors.testType,
              }
            )}
          >
            <select
              {...formik.getFieldProps("testType")}
              className={clsx(
                "form-select",
                {
                  "is-invalid":
                    formik.touched.testType && formik.errors.testType,
                },
                {
                  "is-valid":
                    formik.touched.testType && !formik.errors.testType,
                }
              )}
              aria-label="Select Laboratory Title"
            >
              <option>Choose Test Type</option>
              {TEST_TYPES.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.title}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.testType && formik.errors.testType && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.testType}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::price Form group  */}
        <div className="fv-row mb-3">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            Price (R)
          </label>
          <input
            placeholder="Test Price (R)"
            {...formik.getFieldProps("price")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.price && formik.errors.price,
              },
              {
                "is-valid": formik.touched.price && !formik.errors.price,
              }
            )}
            type="number"
            name="price"
            autoComplete="off"
          />
          {formik.touched.price && formik.errors.price && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.price}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::price for extra slides (per slide) Form group  */}
        <div className="fv-row mb-3">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            Extra Slides Price (R)
          </label>
          <input
            placeholder="Extra Price Per Slide"
            {...formik.getFieldProps("extraPrice")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.extraPrice && formik.errors.extraPrice,
              },
              {
                "is-valid":
                  formik.touched.extraPrice && !formik.errors.extraPrice,
              }
            )}
            type="number"
            name="extraPrice"
            autoComplete="off"
          />
          {formik.touched.extraPrice && formik.errors.extraPrice && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.extraPrice}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

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
      </ModalForm>
    </ModalLayout>
  );
};

export { AddNewTestPrice };