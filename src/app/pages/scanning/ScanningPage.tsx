import { SlidesTable } from "../../modules/scanning/components/SlidesTable";
import { SlideRow } from "../../modules/scanning/components/SlideRow";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useStartFullSlideScanning } from "../../modules/scanning/hooks/useStartFullSlideScanning";
import { useSlides } from "../../modules/settings/slides/hooks/useSlides";
import { useState } from "react";
import {
  AreaModel,
  ScanModel,
  SlideModel,
} from "../../modules/scanning/core/_models";
import { ClearSlotsButton } from "../../modules/scanning/components/CleareSlotsButton";
import StartRegionScanButton from "../../modules/scanning/components/StartRegionScanButton";
import { useScans } from "../../modules/scanning/hooks/useScans";
import { Spinner } from "react-bootstrap";

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
export interface SelectedRegion {
  scanId: number;
  regions: AreaModel[];
}
const ScanningPage = () => {
  const [selectedRegions, setSelectedRegions] = useState<SelectedRegion[]>([]);

  const handleRegionSelection = (scanId: number, regions: AreaModel[]) => {
    setSelectedRegions((prevRegions) => {
      // Check if there's already an entry for this slide
      const existingIndex = prevRegions.findIndex(
        (entry) => entry.scanId === scanId
      );

      if (existingIndex !== -1) {
        // Update the existing entry with the new regions
        const updatedRegions = [...prevRegions];
        updatedRegions[existingIndex] = { scanId, regions };
        return updatedRegions;
      } else {
        // Add a new entry for this slide
        return [...prevRegions, { scanId, regions }];
      }
    });
  };

  const { isStarting, startFullSlideScanning, data } =
    useStartFullSlideScanning();
    const { isLoading: isLoadingSlides, slides } = useSlides();
    const { isLoading: isLoadingScans, scans } = useScans();

  const checkboxes = Array.from({ length: slides.length }, (_, index) => index + 1);
  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
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



  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row g-5 g-xl-8">
        {/* begin::Action */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!isStarting && (
                <span className="indicator-label">Start 2x Scanning</span>
              )}
              {isStarting && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </button>

            <div>
              <StartRegionScanButton selectedRegions={selectedRegions} />
            </div>
          </div>
          <ClearSlotsButton
            isLoading={isLoadingScans || isLoadingSlides || isStarting}
          />
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
              {isLoadingScans && isLoadingSlides && (
                <tr>
                  <td colSpan={20} className="text-center">
                    <span className="text-muted"> Loading...</span>
                    <Spinner animation="border" size="sm" />
                  </td>
                </tr>
              )}
              {!isLoadingScans &&
                !isLoadingSlides &&
                slides &&
                slides.length > 0 &&
                slides.map((slide: SlideModel, _index: number) => {
                  // Find the corresponding scan for this slide
                  const matchingScan = scans.find(
                    (scan: ScanModel) => scan.nth === slide.nth
                  );

                  return (
                    <SlideRow
                      handleCheckboxChange={handleCheckboxChange}
                      formik={formik}
                      key={_index}
                      slide={slide}
                      scan={matchingScan} // Pass the found scan object to the SlideRow
                      handleSetAreas={handleRegionSelection}
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
