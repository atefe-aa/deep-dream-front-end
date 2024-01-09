type Props = {
  label: string;
  isChecked: boolean;
};

const MagnificationCheckbox: React.FC<Props> = ({ label, isChecked }) => {
  return (
    <div className="me-5 row align-items-center">
      <label className="col col-form-label fw-bold text-start text-lg-end">
        {label}
      </label>
      <div className="col">
        <div className="form-check form-check-custom form-check-solid form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isChecked}
            //   onChange={() =>
            //     updateData({
            //       setupEmailNotifications: {
            //         ...data.setupEmailNotifications,
            //         sendCopyToPersonalEmail:
            //           !data.setupEmailNotifications.sendCopyToPersonalEmail,
            //       },
            //     })
            //   }
          />
        </div>
      </div>
    </div>
  );
};

export default MagnificationCheckbox;
