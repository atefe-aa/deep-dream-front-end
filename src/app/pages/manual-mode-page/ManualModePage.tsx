import { useRef } from "react";
import ManualSettings from "../../modules/manual-mode/components/ManualSettings";
import CameraViewBox from "../../modules/manual-mode/components/CameraViewBox";
import PatientDetails from "../../modules/manual-mode/components/PatientDetails";
import ScreenshotButton from "../../ui/ScreenshotButton";

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
