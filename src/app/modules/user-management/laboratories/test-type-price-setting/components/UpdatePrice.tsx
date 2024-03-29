import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../../../ui/modals/ModalForm";
import { LabsModel, PriceModel } from "../../core/_models";
import { useCloseModalOnSuccess } from "../../../../hooks/useCloseModalOnSuccess";
import { useUpdatePrice } from "../hooks/useUpdatePrice";
import { usePrice } from "../hooks/usePrice";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

const addSchema = Yup.object().shape({
  price: Yup.number()
    .min(1, "The min price can't be less than 1")
    .required("Price is required."),
  extraPrice: Yup.number()
    .min(1, "The min price can't be less than 1")
    .required("Price is required."),
});

type Props = {
  labData: LabsModel;
  price: PriceModel;
};

const EditPrice: React.FC<Props> = ({ labData, price }) => {
  // const { isLoading, price } = usePrice(price.id);
  const { updatePrice, isUpdating, data } = useUpdatePrice(price.id);

  const formik = useFormik({
    initialValues: {
      id: price.id,
      price: price.price||undefined as unknown as number,
      extraPrice: price.extraPrice||undefined as unknown as number,
      description: price.description ||"",
    },
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        updatePrice(values);
      } catch (error) {
        console.error(error);
        setStatus("Somthing went wrong updating price. Try again later.");
        setSubmitting(false);
      }
    },
  });
  // useEffect(() => {
  //   if (!isLoading && price) {
  //     formik.setValues({
  //       id:priceId,
  //       price: price.price || 0,
  //       extraPrice: price.extraPrice || 0,
  //       description: price.description || "",
  //     });
  //   }
  // }, [isLoading, price, formik.setValues]);

  // {if(isLoading)return<Spinner animation="border" />}
  useCloseModalOnSuccess(`edit_price_info${price.id}`, data, formik);
  return (
    <ModalLayout
      modalId={`edit_price_info${price.id}`}
      title={`${labData.labName} Laboratory`}
    >
      <ModalForm
        isError={false}
        isLoading={isUpdating}
        modalId={`edit_price_info${price.id}`}
        formik={formik}
      >
        {/* begin::test type Form group */}
        <div className="fv-row text-start mb-3">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            Test Type
          </label>
          <input
            disabled={true}
            className={clsx("form-control bg-transparent")}
            value={price.testName}
            type="string"
            name="testType"
            autoComplete="off"
          />
        </div>
        {/* end::Form group */}

        {/* begin::price Form group  */}
        <div className="fv-row text-start mb-3">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            Price (R)
          </label>
          <input
            disabled={isUpdating}
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
                <span role="alert">{String(formik.errors.price)}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::price for extra slides (per slide) Form group  */}
        <div className="fv-row text-start mb-3">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            Extra Slides Price (R)
          </label>
          <input
            disabled={isUpdating}
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
                <span role="alert">{String(formik.errors.extraPrice)}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin:: description Form group */}
        <div className="fv-row text-start mb-3">
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

export { EditPrice };
