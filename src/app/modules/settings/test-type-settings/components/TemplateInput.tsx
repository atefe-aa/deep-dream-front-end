import clsx from "clsx";
import { useReportTemplates } from "../../../reports/hooks/useReportTemplates";
import { ReportTemplateModel } from "../../../reports/_model";

interface Props {
  formik: any;
}

function TemplateInput({ formik }: Props) {
    const { reports, isLoading } = useReportTemplates();



  return (
    <div className="fv-row mb-3 text-start">
      {isLoading ? (
        <span>Loading Templates List...</span>
      ) : (
        <>
          <label className="form-label required fw-bolder text-gray-900 fs-6 mb-0">
           Report Template
          </label>

          <select
            {...formik.getFieldProps("template")}
            className={clsx(
              "form-select",
              {
                "is-invalid":
                  formik.touched.template && formik.errors.template,
              },
              {
                "is-valid":
                  formik.touched.template && !formik.errors.template,
              }
            )}
            aria-label="Select Laboratory Title"
            onChange={(e) =>
              formik.setFieldValue("template", parseInt(e.target.value, 10))
            }
          >
            <option value="0">Choose Laboratory</option>
            {!isLoading &&
              reports &&
              reports.length > 0 &&
              reports.map((report: ReportTemplateModel) => (
                <option key={report.id} value={report.id}>
                  {report.testTitle}
                </option>
              ))}
          </select>
        </>
      )}

      {formik.touched.template && formik.errors.template && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">
            <span role="alert">{formik.errors.template}</span>
          </div>
        </div>
      )}
    </div>
  );
}
export { TemplateInput };
