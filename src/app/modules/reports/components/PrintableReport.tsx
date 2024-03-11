import { ReportTemplateModel } from "../_model";

type Props = {
  template: ReportTemplateModel | undefined;
  formik: any;
  isCreating: boolean;
};

const PrintableReport: React.FC<Props> = ({ template, formik, isCreating }) => {
  return (
    <div>
      {template !== undefined &&
        template &&
        template.sections &&
        template.sections.length > 0 &&
        template.sections.map((section) => (
          <div key={section.id}>
            <div
              style={{
                marginTop: "15px",
                fontSize: "15px",
                fontWeight: "bolder",
              }}
            >
              {section.sectionTitle}
            </div>
            {section.groups &&
              section.groups.length > 0 &&
              section.groups.map((group, index) => (
                <div
                  key={group.title + index}
                  style={{
                    width: "max-content",
                    paddingRight: "5px",
                    display: "flex",
                    justifyContent: "start",
                    border: `${
                      group.className &&
                      group.className.length > 0 &&
                      group.className.includes("border")
                        ? "0.5px solid grey"
                        : ""
                    }`,
                  }}
                >
                  {group.title && group.title.length > 0 && (
                    <span>{group.title}:</span>
                  )}
                  {group.options &&
                    group.options.length > 0 &&
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
                          <div key={option.id} className="">
                            <div>{formik.values[option.id]}</div>
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
    </div>
  );
};

export { PrintableReport };
