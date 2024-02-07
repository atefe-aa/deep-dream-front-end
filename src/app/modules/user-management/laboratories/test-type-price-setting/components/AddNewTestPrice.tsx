import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../../../ui/modals/ModalForm";
import { TestTypeInput } from "../../../../tests/components/add-new-test/components/TestTypeInput";
import { useCreatePrice } from "../hooks/useCreatePrice";
import { LabsModel } from "../../core/_models";
import { useCloseModalOnSuccess } from "../../../../hooks/useCloseModalOnSuccess";

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
  price: undefined as number | undefined,
  extraPrice: undefined as number | undefined,
  description: "",
};

type Props = {
  labData: LabsModel;
};

const AddNewTestPrice: React.FC<Props> = ({ labData }) => {
  const { isCreating, createPrice, data } = useCreatePrice();

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        createPrice({ ...values, labId: labData.id });
      } catch (error) {
        console.error(error);
        setStatus("Somthing went wrong creating new price. Try again later.");
        setSubmitting(false);
      }
    },
  });
  useCloseModalOnSuccess(
    `kt_modal_add_new_test_price_${labData.labName.toLowerCase()}`,
    data,
    formik
  );
  return (
    <ModalLayout
      modalId={`kt_modal_add_new_test_price_${labData.labName.toLowerCase()}`}
      title={`${labData.labName} Laboratory`}
    >
      <ModalForm
        isError={false}
        isLoading={isCreating}
        modalId={`kt_modal_add_new_test_price_${labData.labName.toLowerCase()}`}
        formik={formik}
      >
        {/* begin::test type Form group */}
        <TestTypeInput formik={formik} labId={labData.id} />
        {/* end::Form group */}

        {/* begin::price Form group  */}
        <div className="fv-row mb-3">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            Price (R)
          </label>
          <input
            disabled={isCreating}
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
            value={formik.values.price !== undefined ? formik.values.price : ""}
            onChange={(e) =>
              formik.setFieldValue(
                "price",
                e.target.value !== "" ? Number(e.target.value) : undefined
              )
            }
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
            disabled={isCreating}
            placeholder="Extra Price Per Slide"
            {...formik.getFieldProps("extraPrice")}
            value={
              formik.values.extraPrice !== undefined
                ? formik.values.extraPrice
                : ""
            }
            onChange={(e) =>
              formik.setFieldValue(
                "extraPrice",
                e.target.value !== "" ? Number(e.target.value) : undefined
              )
            }
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
