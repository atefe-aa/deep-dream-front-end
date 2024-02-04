import { useEffect, useState } from "react";
import { SlidesTable } from "../../modules/scanning/components/SlidesTable";
import { SlideRow } from "../../modules/scanning/components/SlideRow";
import * as Yup from "yup";
import { useFormik } from "formik";
import Timer from "../../modules/scanning/components/Timer";
import { SlidesFakeData } from "../../utils/constants";

import { useStartFullSlideScanning } from "../../modules/scanning/hooks/useStartFullSlideScanning";
import { usePusher } from "../../modules/hooks/usePusher";
import { useSlides } from "../../modules/scanning/hooks/useSlides";
import { log } from "console";

interface FormValues {
  selectedCheckboxes: number[];
  selectAll: boolean;
  testNumber: number;
}
const initialValues: FormValues = {
  selectedCheckboxes: [],
  selectAll: false,
  testNumber: 0,
};
const addSchema = Yup.object().shape({
  selectedCheckboxes: Yup.array()
    .min(1, "Select at least one slide!")
    .required("Select at least one slide!"),
});

const ScanningPage = () => {
  const { isStarting, startFullSlideScanning, data } =
    useStartFullSlideScanning();


  const checkboxes = Array.from({ length: 10 }, (_, index) => index + 1);
  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        console.log(values);
        startFullSlideScanning(values.selectedCheckboxes);
      } catch (error) {
        console.error(error);

        setStatus("The scanning details are incorrect");
        setSubmitting(false);
      }
    },
  });

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("selectAll", e.target.checked);

    if (e.target.checked) {
      formik.setFieldValue("selectedCheckboxes", checkboxes);
    } else {
      formik.setFieldValue("selectedCheckboxes", []);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    let newSelectedCheckboxes = [...formik.values.selectedCheckboxes];

    if (checked) {
      newSelectedCheckboxes.push(+value);
    } else {
      newSelectedCheckboxes = newSelectedCheckboxes.filter(
        (checkbox) => checkbox !== +value
      );
    }

    formik.setFieldValue("selectedCheckboxes", newSelectedCheckboxes);

    // Update selectAll checkbox if all checkboxes are selected

    if (newSelectedCheckboxes.length === checkboxes.length) {
      formik.setFieldValue("selectAll", true);
    } else {
      formik.setFieldValue("selectAll", false);
    }
  };

  const { isLoading, slides } = useSlides();

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row g-5 g-xl-8">
        {/* begin::Action */}
        <div className="d-flex align-items-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!isStarting && (
              <span className="indicator-label">Start Scanning</span>
            )}
            {isStarting && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
          <div>
            <Timer />
          </div>
        </div>
        {/* end::Action */}
        {formik.touched.selectedCheckboxes &&
          formik.errors.selectedCheckboxes && (
            <div className="fv-plugins-message-container mb-4">
              <div className="fv-help-block">
                <span role="alert">*** {formik.errors.selectedCheckboxes}</span>
              </div>
            </div>
          )}

        <div className="col-xl-12">
          <div className="card-xl-stretch mb-xl-8">
            <SlidesTable
              handleSelectAllChange={handleSelectAllChange}
              formik={formik}
              className="card-xl-stretch mb-xl-8"
            >
              {!isLoading &&
                slides &&
                slides.length > 0 &&
                slides.map((slide: SlideModel, _index: number) => {
                  const scan = data?.data.find(
                    (item: ScanModel) => item.nth === slide.nth
                  );

                  return (
                    <SlideRow
                      handleCheckboxChange={handleCheckboxChange}
                      formik={formik}
                      key={_index}
                      slide={slide}
                      scan={scan}
                    />
                  );
                })}
            </SlidesTable>
          </div>
        </div>
      </div>
    </form>
  );
};

export { ScanningPage };
