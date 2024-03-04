import clsx from "clsx";
import { useLaboratories } from "../../../../user-management/laboratories/hooks/useLaboratories";
import { LabsModel } from "../../../../user-management/laboratories/core/_models";

interface Props {
  formik: any;
}

function LaboratoryInput({ formik }: Props) {
  const { isLoading: isLoadingLaboratories, laboratories } =
    useLaboratories("noPaginate=true");

  return (
    <div className="fv-row mb-3 text-start">
      {isLoadingLaboratories ? (
        <span>Loading Laboratories List...</span>
      ) : (
        <>
          <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            Sender Laboratory<span className="text-danger">*</span>
          </label>

          <select
            {...formik.getFieldProps("laboratoryId")}
            className={clsx(
              "form-select",
              {
                "is-invalid":
                  formik.touched.laboratoryId && formik.errors.laboratoryId,
              },
              {
                "is-valid":
                  formik.touched.laboratoryId && !formik.errors.laboratoryId,
              }
            )}
            aria-label="Select Laboratory Title"
            onChange={(e) =>
              formik.setFieldValue("laboratoryId", parseInt(e.target.value, 10))
            }
          >
            <option value="0">Choose Laboratory</option>
            {!isLoadingLaboratories &&
              laboratories &&
              laboratories.length > 0 &&
              laboratories.map((lab: LabsModel) => (
                <option key={lab.id} value={lab.id}>
                  {lab.labName}
                </option>
              ))}
          </select>
        </>
      )}

      {formik.touched.laboratoryId && formik.errors.laboratoryId && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">
            <span role="alert">{formik.errors.laboratoryId}</span>
          </div>
        </div>
      )}
    </div>
  );
}
export { LaboratoryInput };
