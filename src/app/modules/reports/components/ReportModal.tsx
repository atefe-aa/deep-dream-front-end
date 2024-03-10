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

type Props = {
  test: TestsModel;
};
const addSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  nationalId: Yup.string().matches(
    /^(?!(\d)\1{9})\d{10}$/,
    "Invalid National ID"
  ),
  age: Yup.number().min(1, "Minimum age is 1 ").required("Age is required"),
  ageUnit: Yup.string().required("Age type is required"),
  gender: Yup.string().required("Gender is required"),
  testType: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(7, "Maximum 7 symbols")
    .required("Test Type is required"),
  laboratoryId: Yup.number()
    .min(1, "Laboratory is required.")
    .required("Laboratory is required"),
  discription: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(300, "Maximum 300 symbols"),
  senderRegistrationCode: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(10, "Maximum 300 symbols"),
});

const initialValues = {
  name: "",
  nationalId: "",
  age: undefined as unknown as number,
  doctorName: "",
  ageUnit: "year" as "year" | "day",
  gender: "female" as "female" | "male",
  testType: 0,

  description: "",
  senderRegistrationCode: "",
  isMultiSlide: false,
  numberOfSlides: 1,
};
const ReportModal: React.FC<Props> = ({ test }) => {
  const { reports, isLoading } = useReportTemplates();
  const [template, setTemplate] = useState<ReportTemplateModel>();
  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        // await createRegistration(values);
      } catch (error) {
        console.error(error);
        setStatus("The login details are incorrect");
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
  useCloseModalOnSuccess(`download_report${test.id}`, "data", formik);

  return (
    <ModalLayout size="lg" modalId={`download_report${test.id}`} title="Download Report">
      <ModalForm
        isError={false}
        isLoading={false}
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
                    className={`justify-content-start ${group.classNames}`}
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
                                    disabled={false}
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
                                autoComplete="on"
                                {...formik.getFieldProps("description")}
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
      </ModalForm>
    </ModalLayout>
  );
};

export { ReportModal };
