import { useCloseModalOnSuccess } from "../../hooks/useCloseModalOnSuccess";
import { ModalLayout } from "../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../ui/modals/ModalForm";
import { TestsModel } from "../../tests/core/_models";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useReportTemplates } from "../hooks/useReportTemplates";
import { ReportTemplateModel } from "../_model";
import clsx from "clsx";
import { useCreateReport } from "../hooks/useCreateReport";

type Props = {
  test: TestsModel;
};
const addSchema = Yup.object().shape({});

type ValuesType = {
  [key: number]: string | boolean;
};
const initialValues: ValuesType = {};

const ReportModal: React.FC<Props> = ({ test }) => {
  const { reports, isLoading } = useReportTemplates();
  const [template, setTemplate] = useState<ReportTemplateModel>();
  const { isCreating, createReport, data } = useCreateReport();

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        // Update values in the template array
        if (template && template.sections) {
          template.sections.forEach((section) => {
            section.groups.forEach((group) => {
              group.options.forEach((option) => {
                if (values.hasOwnProperty(option.id)) {
                  option.value = values[option.id];
                }
              });
            });
          });

          createReport({ ...template, testId: test.id });
        }
      } catch (error) {
        console.error(error);
        setStatus("An error occurred while submitting the form.");
        setSubmitting(false);
      }
    },
  });
  function handleTemplateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (isLoading || !reports || reports.length === 0) return;

    const templateId = parseInt(e.target.value);
    const selectedTemplate = reports.find(
      (repo: ReportTemplateModel) => repo.id === templateId
    );

    if (selectedTemplate) {
      setTemplate(selectedTemplate);
    } else {
      setTemplate(undefined);
    }
  }
  useCloseModalOnSuccess(`download_report${test.id}`, data, formik);

  return (
    <ModalLayout
      size="lg"
      modalId={`download_report${test.id}`}
      title="Download Report"
    >
      <ModalForm
        isError={false}
        isLoading={isCreating}
        modalId={`download_report${test.id}`}
        formik={formik}
      >
        {/* Template selection */}
        <div className="fv-row mb-3">
          {/* <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
            
          </label> */}
          <div className={clsx("mt-3 mb-5 bg-transparent")}>
            <select
              onChange={handleTemplateChange}
              defaultValue={undefined}
              className={clsx("form-select")}
              aria-label="Select Report Template"
              disabled={isCreating}
            >
              <option value={undefined}>Choose a template</option>
              {!isLoading &&
                reports &&
                reports.map((rep: ReportTemplateModel) => (
                  <option key={rep.id} value={rep.id}>
                    {rep.testTitle}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/*end Template selection */}

        {template &&
          template.sections &&
          template.sections.map((section) => (
            <div key={section.id}>
              <h5 className="mt-5 text-start">{section.sectionTitle}</h5>
              {section.groups.length > 0 &&
                section.groups.map((group, index) => (
                  <div
                    key={group.title + index}
                    className={`justify-content-start ${group.className}`}
                  >
                    {group.title.length > 0 && <span>{group.title}:</span>}
                    {group.options.length > 0 &&
                      group.options.map((option) => {
                        if (option.type === "checkbox")
                          return (
                            <div className="" key={option.id}>
                              <div className="form-check form-check-custom form-check-solid">
                                <label className="form-label fw-bolder text-gray-800 fs-6">
                                  <input
                                    {...formik.getFieldProps(option.id)}
                                    checked={Boolean(formik.values[option.id])}
                                    onChange={formik.handleChange}
                                    disabled={isCreating}
                                    className="form-check-input me-1 ms-3"
                                    type="checkbox"
                                    name={option.id.toString()}
                                  />
                                  {option.label}
                                </label>
                              </div>
                            </div>
                          );
                        if (option.type === "textArea")
                          return (
                            <div key={option.id} className="fv-row mb-3">
                              <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                                {option.label}
                              </label>
                              <textarea
                                disabled={isCreating}
                                autoComplete="on"
                                {...formik.getFieldProps(option.id)}
                                value={option.value.toString()}
                                onChange={formik.handleChange}
                                className="form-control bg-transparent"
                                style={{ minHeight: "150px" }}
                              />
                            </div>
                          );
                      })}
                  </div>
                ))}
            </div>
          ))}
        {template && template.note && template?.note?.length > 0 && (
          <h6 className="text-start my-3">Note:{template.note}</h6>
        )}
      </ModalForm>
    </ModalLayout>
  );
};

export { ReportModal };
