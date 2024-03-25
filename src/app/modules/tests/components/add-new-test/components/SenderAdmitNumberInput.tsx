import clsx from "clsx";
import { useEffect, useState } from "react";
import { useMiladAdmitInfo } from "../../../hooks/useMiladAdmitInfo";

type Props = {
  formik: any;
};

const SenderAdmitNumberInput: React.FC<Props> = ({ formik }) => {
  const { data, isLoading } = useMiladAdmitInfo(
    formik.values.senderRegistrationCode
  );

  const miladLabId = localStorage.getItem("miladLabId");

  useEffect(() => {
    console.log(miladLabId);
    const selectedLab = formik.values.laboratoryId;

    if (!isLoading && data && miladLabId && selectedLab === miladLabId) {
      console.log(data);
      formik.setValues({
        name:data.id,
        nationalId:data.id,
        age:data.id,
        ageUnit:data.id,
        gender:data.id,
        discription:data.id,
      });
    }
  }, [formik, isLoading]);

  return (
    <div className="fv-row mb-3">
      <label className="form-label fs-6 fw-bolder text-gray-900">
        Sender Admit Number
      </label>

      <input
        placeholder="Sender Admit Number"
        {...formik.getFieldProps("senderRegistrationCode")}
        className={clsx(
          "form-control bg-transparent",
          {
            "is-invalid":
              formik.touched.senderRegistrationCode &&
              formik.errors.senderRegistrationCode,
          },
          {
            "is-valid":
              formik.touched.senderRegistrationCode &&
              !formik.errors.senderRegistrationCode,
          }
        )}
        type="text"
        autoComplete="on"
      />
      {formik.touched.senderRegistrationCode &&
        formik.errors.senderRegistrationCode && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.senderRegistrationCode}</span>
            </div>
          </div>
        )}
    </div>
  );
};

export { SenderAdmitNumberInput };
