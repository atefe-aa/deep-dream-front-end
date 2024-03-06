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
          {/* <CustomTable
            tableTitle="Patient Information"
            className="card-xxl-stretch mb-5 mb-xl-8"
            columns={[
              "Admit Patient",
              "Patient",
              "National ID",
              "Admit Date & Time",
              "Sender Laboratory",
              "Progress",
            ]}
          >
            <PatientsTableRow data={FAKE_DATA[0]} index={1} />
          </CustomTable> */}
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;
