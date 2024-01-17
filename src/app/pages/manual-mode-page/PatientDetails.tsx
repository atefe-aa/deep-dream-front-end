import clsx from "clsx";
import { CustomTable } from "../../ui/table/CustomTable";
import { PatientsTableRow } from "../../ui/table/patients/PatientsTableRow";
import { FAKE_DATA } from "../../utils/constants";

function PatientDetails() {
  return (
    <div className="row gy-5 g-xxl-8 ">
      <div className="d-flex flex-column  border rounded m-2  p-4">
        <div className="d-flex align-items-center">
          <label className="form-label min-w-150px" htmlFor="registerNumber">
            Register Number
          </label>
          <input
            type="number"
            className="form-control "
            id="registerNumber"
            name="registerNumber"
            placeholder="Enter Register Number"
          />
        </div>
        <div className="card mt-4 p-5">
          <CustomTable
            tableTitle="Patient Information"
            className="card-xxl-stretch mb-5 mb-xl-8"
            columns={[
              "Admit Patient",
              "Patient",
              "Price(R)",
              "Number of Slides",
              "Admit Date & Time",
              "Sender Laboratory",
              "Scan Duration",
              "Progress",
            ]}
          >
            <PatientsTableRow data={FAKE_DATA[0]} index={1} />
          </CustomTable>
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
