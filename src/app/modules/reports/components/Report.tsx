import { ReportTemplateModel } from "../_model";

type Props = {
  template: ReportTemplateModel | undefined;
  formik: any;
  isCreating: boolean;
};

const Report: React.FC<Props> = ({ template, formik, isCreating }) => {
  return (
    <div>
      {template !== undefined &&
        template &&
        template.sections &&
        template.sections.length > 0 &&
        template.sections.map((section) => (
          <div key={section.id}>
            <h5 className="mt-5 text-start text-info">{section.sectionTitle}</h5>
            {section.groups &&
              section.groups.length > 0 &&
              section.groups.map((group, index) => (
                <div
                  key={group.title + index}
                  className={`justify-content-start ${group.className}`}
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
                          <div key={option.id} className="fv-row mb-3">
                            <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
                              {option.label}
                            </label>
                            <textarea
                              disabled={isCreating}
                              autoComplete="on"
                              {...formik.getFieldProps(option.id)}
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
    </div>
  );
};

export { Report };
