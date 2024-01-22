type Props = {
  label: string;
  type: string;
  placeHolder: string;
  inputName: string;
  formik: any;
  fullWidth?: boolean;
  required?: boolean;
};

const SettingFormGroup: React.FC<Props> = ({
  fullWidth = false,
  required = true,
  label,
  type,
  placeHolder,
  inputName,
  formik,
}) => {
  return (
    <div className="row mb-6">
      <label
        htmlFor={inputName}
        className={`col-lg-4 col-form-label  fw-bold fs-6 ${required?"required":""}`}
      >
        {label}
      </label>

      <div className="col-lg-8">
        <div className="row">
          <div className={`fv-row ${fullWidth ? "" : "col-lg-6"}`}>
            <input
              type={type}
              className="form-control mb-3 mb-lg-0"
              placeholder={placeHolder}
              name={inputName}
              id={inputName}
              {...formik.getFieldProps(inputName)}
            />
            {formik.touched.inputName && formik.errors.inputName && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{formik.errors.inputName}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingFormGroup;
