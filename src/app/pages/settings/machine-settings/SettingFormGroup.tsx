type Props = {
  label: string;
  type: string;
  placeHolder: string;
  inputName: string;
  value: number;
  // formik:any
};

const SettingFormGroup: React.FC<Props> = ({
  label,
  type,
  placeHolder,
  inputName,
  value,
  //   formik
}) => {
  return (
    <div className="row mb-6">
      <label className="col-lg-4 col-form-label required fw-bold fs-6">
        {label}
      </label>

      <div className="col-lg-8">
        <div className="row">
          <div className="col-lg-6 fv-row">
            <input
              type={type}
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
              placeholder={placeHolder}
              value={value}
              //   {...formik.getFieldProps("fName")}
            />
            {/* {formik.touched.fName && formik.errors.fName && (
<div className="fv-plugins-message-container">
<div className="fv-help-block">
  {formik.errors.fName}
</div>
</div>
)} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingFormGroup;
