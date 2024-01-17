import { useRef } from "react";
import ManualSettings from "./ManualSettings";
import CameraViewBox from "./CameraViewBox";
import ScreenshotButton from "../../ui/ScreenShotButton";
import PatientDetails from "./PatientDetails";

function ManualModePage() {
  const targetComponentRef = useRef(null);

  return (
    <>
    <PatientDetails />
      <ScreenshotButton targetComponentRef={targetComponentRef} />
      
      <div className="row gy-5 g-xxl-8 " style={{ height: "100vh" }}>
        {/* begin::Col */}
        <CameraViewBox targetComponentRef={targetComponentRef} />
        <ManualSettings />
        {/* end::Col */}
      </div>
    </>
  );
}

export default ManualModePage;
