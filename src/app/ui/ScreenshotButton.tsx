import { useRef } from "react";
import html2canvas from "html2canvas";
import { KTIcon } from "../../_metronic/helpers";

type Props={
    targetComponentRef: React.MutableRefObject<null>;
    withTitle?:boolean;
    colorClass?:string
}

const  ScreenshotButton : React.FC<Props>=({targetComponentRef, withTitle=true, colorClass ="info"})=> {


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
      <div
      data-bs-toggle="tooltip"
      title="Save a screenshot"
        className="row align-items-center  btn btn-active-icon-primary"
        onClick={captureScreenshot}
      >
        <button
          type="button"
          className="col-1 btn btn-icon btn-bg-transparent btn-active-icon-primary "
        >
          <KTIcon iconName="exit-down" className={`fs-1 text-lg-1 text-${colorClass}`} />
        </button>
       {withTitle && <span className="fs-4 text-muted col-2 ">Save a screenshot</span>}
      </div>
     
  );
}

export default ScreenshotButton;
