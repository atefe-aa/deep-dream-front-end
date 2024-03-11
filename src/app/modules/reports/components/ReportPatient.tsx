import { TestsModel } from "../../tests/core/_models";

type Props = {
  test: TestsModel;
};

const ReportPatient: React.FC<Props> = ({ test }) => {
  return (
    <div
      style={{
        border: "0.5px solid gray",
        padding: "10px",
        margin: "10px 0 10px 0",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontWeight: "bold" }}> Patient Name: </span>{" "}
          <span>{test.name}</span>
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}> Age: </span>
          <span>
            {test.age} {test.ageUnit}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}> Doctor: </span>{" "}
          <span>{test.doctorName}</span>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "8px" }}>
        <div>
          <span style={{ fontWeight: "bold" }}>Admit Date: </span>{" "}
          <span>{test.date}</span>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <span style={{ fontWeight: "bold" }}> Admit Number: </span> Admit
          Number: <span>{test.id}</span>
        </div>
      </div>
    </div>
  );
};
export { ReportPatient };
