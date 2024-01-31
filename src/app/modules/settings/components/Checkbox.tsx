type Props = {
  label: string;
  inputName: string;
  formik: any;
};

const Checkbox: React.FC<Props> = ({ label, inputName, formik }) => {
  return (
    <div className="row align-items-center">
      <label
        htmlFor={inputName}
        className="col-4 col-form-label  fw-bold fs-6"
      >
        {label}
      </label>

      <div className="col-8">
        <div className="col">
          <div className="form-check form-check-custom form-check-solid form-switch">
            <input
              className="form-check-input"
          
              type="checkbox"
              checked={formik.values[inputName]}
              onChange={formik.handleChange}
              name={inputName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
