import { useRef } from "react";
import { KTIcon } from "../../../_metronic/helpers";
import html2canvas from "html2canvas";
import ManualSettings from "./ManualSettings";
import CameraViewBox from "./CameraViewBox";

function ManualModePage() {
  const targetComponentRef = useRef(null);

  const captureScreenshot = () => {
    if (targetComponentRef.current) {
      html2canvas(targetComponentRef.current)
        .then((canvas) => {
          // Convert canvas to data URL
          const screenshotDataURL = canvas.toDataURL();

          // Create a temporary link element
          const downloadLink = document.createElement("a");
          downloadLink.href = screenshotDataURL;

          // Set the file name
          downloadLink.download = `screenshot${Math.round(
            Math.random() * 1000
          )}.png`;

          // Append the link to the body, trigger a click, and remove it
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        })
        .catch((error) => {
          console.error("Error capturing screenshot:", error);
        });
    }
  };

  return (
    <>
      <div
        className="row mt-5 align-items-center  btn btn-active-icon-primary"
        onClick={captureScreenshot}
      >
        <button
          type="button"
          className="col-1 btn btn-icon btn-bg-transparent btn-active-icon-primary "
        >
          <KTIcon iconName="exit-down" className="fs-1 text-lg-1 text-info" />
        </button>
        <span className="fs-4 text-muted col-2 ">Save a screenshot</span>
      </div>
      <div className="row gy-5 g-xxl-8 ">
        {/* begin::Col */}
        
       <CameraViewBox  targetComponentRef={targetComponentRef}/>

        <ManualSettings />

        {/* end::Col */}
      </div>
    </>
  );
}

export default ManualModePage;
