import { ModalLayout } from "../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../ui/modals/ModalForm";
import { TestsModel } from "../../tests/core/_models";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useReportTemplates } from "../hooks/useReportTemplates";
import { ReportTemplateModel } from "../_model";
import clsx from "clsx";
import { useCreateReport } from "../hooks/useCreateReport";

import { ExportPdf } from "./ExportPdf";
import { Report } from "./Report";

type Props = {
  test: TestsModel;
};

type ValuesType = {
  [key: number]: string | boolean;
};

const ReportModal: React.FC<Props> = ({ test }) => {
  const { isCreating, createReport, data } = useCreateReport();

  //if a report already exits fort the test, set it as initial template
  let initialTemplate = test.report !== null ? test.report : undefined;

  const [template, setTemplate] = useState<ReportTemplateModel | undefined>(
    initialTemplate
  );

  const { reports, isLoading } = useReportTemplates();
  //if the test doesn't have a report field and there is a templateId then use the templateId
  //to finde the report template from the reports list
  if (
    !isLoading &&
    reports &&
    reports.length > 0 &&
    initialTemplate === undefined &&
    test.templateId
  ) {
    initialTemplate = reports.find(
      (repo: ReportTemplateModel) => repo.id === test.templateId
    );

    if(template !== initialTemplate) setTemplate(initialTemplate);
    
  }

  //for exporting pdf we need to have new state changes
  const [newTemplate, setNewTemplate] = useState<
    ReportTemplateModel | undefined
  >(initialTemplate);

  let initialValues: ValuesType = {};
  if (test.report) {
    test.report.sections.forEach((section) => {
      section.groups.forEach((group) => {
        group.options.forEach((option) => {
          initialValues[option.id] = option.value !== null ? option.value : "";
        });
      });
    });
  }
  const formik = useFormik({
    initialValues,
    // validationSchema: addSchema,
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
          setNewTemplate(template);
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
  // useCloseModalOnSuccess(`download_report${test.id}`, data, formik);

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
          {newTemplate && (
            <ExportPdf
              test={test}
              formik={formik}
              isCreating={isCreating}
              template={newTemplate}
            />
          )}
          {!template && (
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
          )}
        </div>
        {/*end Template selection */}

        <Report formik={formik} isCreating={isCreating} template={template} />
      </ModalForm>
    </ModalLayout>
  );
};

export { ReportModal };
