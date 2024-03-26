import clsx from "clsx";
import { useEffect, useState } from "react";
import { useMiladAdmitInfo } from "../../../hooks/useMiladAdmitInfo";

type Props = {
  formik: any;
};

const SenderAdmitNumberInput: React.FC<Props> = ({ formik }) => {
  const { data, isPending, getAdmitInfo } = useMiladAdmitInfo(
    formik.values.senderRegistrationCode
  );

  const miladLabId = localStorage.getItem("miladLabId");

  useEffect(() => {
    const selectedLab = formik.values.laboratoryId;
    if (
      !isPending &&
      miladLabId &&
      Number(selectedLab) === Number(miladLabId) &&formik.values.senderRegistrationCode&&
      (!data || data.admitNumber !== formik.values.senderRegistrationCode)
    ) {
      getAdmitInfo();
    }
    if (
      !isPending &&
      data &&
      miladLabId &&
      Number(selectedLab) === Number(miladLabId)
    ) {
      formik.setValues({
        ...formik.values,
        name: data.name,
        nationalId: data.nationalId,
        age: data.age,
        ageUnit: data.ageUnit,
        gender: data.gender,
        description: data.description,
        doctorName: data.doctorName,
      });
    }
  }, [
    formik.values.senderRegistrationCode,
    formik.values.laboratoryId,
    isPending,
  ]);

  // function handleAdmitInfo(e:any) {
  //   e.preventDefault();

  //   const selectedLab = formik.values.laboratoryId;
  //   if (!isPending && miladLabId && selectedLab === miladLabId) {
  //     getAdmitInfo();
  //   }
  //   return;
  // }

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
        // onBlur={handleAdmitInfo}
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
