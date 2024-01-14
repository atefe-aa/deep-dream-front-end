type Props = {
  label: string;
  type: string;
  placeHolder: string;
  inputName: string;
  formik: any;
};

const SettingFormGroup: React.FC<Props> = ({
  label,
  type,
  placeHolder,
  inputName,
  formik,
}) => {
  return (
    <div className="row mb-6">
      <label htmlFor={inputName} className="col-lg-4 col-form-label required fw-bold fs-6">
        {label}
      </label>

      <div className="col-lg-8">
        <div className="row">
          <div className="col-lg-6 fv-row">
            <input
              type={type}
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
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
