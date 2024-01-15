type Props = {
  label: string;
  inputName: string;
  formik: any;
};

const Checkbox: React.FC<Props> = ({ label, inputName, formik }) => {
  return (
    <div className="row me-5">
      <label
        htmlFor={inputName}
        className="col-lg-4 col-form-label  fw-bold fs-6"
      >
        {label}
      </label>

      <div className="col-lg-8">
        <div className="col">
          <div className="form-check form-check-custom form-check-solid form-switch">
            <input
              className="form-check-input"
              id={inputName}
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
