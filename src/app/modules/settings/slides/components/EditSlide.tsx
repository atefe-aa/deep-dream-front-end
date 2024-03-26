import { FC, useEffect } from "react";

import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../../ui/modals/ModalForm";
import { useSlides } from "../hooks/useSlides";
import { useUpdateSlide } from "../hooks/useUpdateSlide";
import { TestContext } from "yup";
import { useCloseModalOnSuccess } from "../../../hooks/useCloseModalOnSuccess";
import { SlideModel } from "../../../scanning/core/_models";

type Props = {
  slideData: SlideModel;
};

const EditSlide: FC<Props> = ({ slideData }) => {
  const { isLoading, slides } = useSlides();

  // Custom validation method to check nth uniqueness or being unchanged
  const nthUniqueOrUnchanged = (value: number, context: TestContext) => {
    if (isLoading) {
      return true; // skip validation if slides are still loading
    }
    // Check if nth value is unchanged or not present in other slides
    const isUnchangedOrUnique =
      slideData.nth === value ||
      !slides.some(
        (slide: SlideModel) => slide.nth === value && slide.id !== slideData.id
      );
    return (
      isUnchangedOrUnique ||
      context.createError({
        message: "The slide number must be unique or unchanged.",
      })
    );
  };

  const addSchema = Yup.object().shape({
    nth: Yup.number()
      .required("Slide Number is required.")
      .test(
        "is-unique-or-unchanged",
        "The slide number must be unique or unchanged.",
        nthUniqueOrUnchanged
      ),
    sw_x: Yup.number().required("SW x is required."),
    sw_y: Yup.number().required("SW y is required."),
    ne_x: Yup.number().required("NE x is required."),
    ne_y: Yup.number().required("NE y is required."),
  });

  const initialValues = {
    nth: slideData.nth || 1,
    sw_x: slideData.sw_x || 0,
    sw_y: slideData.sw_y || 0,
    ne_x: slideData.ne_x || 0,
    ne_y: slideData.ne_y || 0,
  };

  const { isUpdating, updateSlide, data } = useUpdateSlide();
  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        const data = {
          nth: values.nth,
          coordinates: {
            sw_x: values.sw_x,
            sw_y: values.sw_y,
            ne_x: values.ne_x,
            ne_y: values.ne_y,
          },
        };

        updateSlide({ ...data, id: slideData.id });
      } catch (error) {
        console.error(error);
        setStatus("Somthing went wrong adding new slide.");
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    // Update formik initialValues whenever data changes
    formik.setValues({
      nth: slideData.nth || 1,
      sw_x: slideData.sw_x || 0,
      sw_y: slideData.sw_y || 0,
      ne_x: slideData.ne_x || 0,
      ne_y: slideData.ne_y || 0,
    });
  }, [slideData]);

  useCloseModalOnSuccess(`edit_slide_info${slideData.id}`, data, formik);

  return (
    <ModalLayout
      modalId={`edit_slide_info${slideData.id}`}
      title="Update slide info"
    >
      <ModalForm
        isError={false}
        isLoading={isUpdating}
        modalId={`edit_slide_info${slideData.id}`}
        formik={formik}
      >
        {/* begin::code Form group  */}
        <div className="fv-row mb-3 text-start">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            Slide Number
          </label>
          <input
            placeholder="Slide Number"
            {...formik.getFieldProps("nth")}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid": formik.touched.nth && formik.errors.nth,
              },
              {
                "is-valid": formik.touched.nth && !formik.errors.nth,
              }
            )}
            type="number"
            name="nth"
            autoComplete="off"
          />
          {formik.touched.nth && formik.errors.nth && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.nth}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
        {/* begin::code Form group  */}
        <div className="fv-row mb-3 text-start">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            SW x
          </label>
          <input
            placeholder="SW X"
            {...formik.getFieldProps("sw_x")}
            className={clsx("form-control bg-transparent")}
            type="number"
            name="sw_x"
            autoComplete="off"
          />
          {formik.touched.sw_x && formik.errors.sw_x && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.sw_x}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */} {/* begin::code Form group  */}
        <div className="fv-row mb-3 text-start">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            SW y
          </label>
          <input
            placeholder="SW Y"
            {...formik.getFieldProps("sw_y")}
            className={clsx("form-control bg-transparent")}
            type="number"
            name="sw_y"
            autoComplete="off"
          />
          {formik.touched.sw_y && formik.errors.sw_y && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.sw_y}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
        {/* begin::code Form group  */}
        <div className="fv-row mb-3 text-start">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            NE x
          </label>
          <input
            placeholder="NE X"
            {...formik.getFieldProps("ne_x")}
            className={clsx("form-control bg-transparent")}
            type="number"
            name="ne_x"
            autoComplete="off"
          />
          {formik.touched.ne_x && formik.errors.ne_x && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.ne_x}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
        {/* begin::code Form group  */}
        <div className="fv-row mb-3 text-start">
          <label className="form-label required fs-6 fw-bolder text-gray-900">
            NE y
          </label>
          <input
            placeholder="NE y"
            {...formik.getFieldProps("ne_y")}
            className={clsx("form-control bg-transparent")}
            type="number"
            name="ne_y"
            autoComplete="off"
          />
          {formik.touched.ne_y && formik.errors.ne_y && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formik.errors.ne_y}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}
      </ModalForm>
    </ModalLayout>
  );
};

export { EditSlide };
