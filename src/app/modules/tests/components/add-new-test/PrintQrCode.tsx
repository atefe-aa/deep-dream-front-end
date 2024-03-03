import { FC, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { KTIcon } from "../../../../../_metronic/helpers";
import QRCodeGenerator from "./QRCodeGenerator";

type Props = {
  testId: number;
  totalSlides: number;
  testType: string;
};

const PrintQrCode: FC<Props> = ({ testId, totalSlides, testType }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open(
        "",
        "PRINT",
        "height=650,width=900,top=100,left=150"
      );

      // Ensure the window opened
      if (printWindow && printWindow.document) {
        printWindow.document.write(`<html><head><title>Print QR Code</title>`);
        // Optionally, add any required styles here
        printWindow.document.write("</head><body>");
        printWindow.document.write(printRef.current.innerHTML);
        printWindow.document.write("</body></html>");

        printWindow.document.close(); // necessary for IE >= 10
        printWindow.focus(); // necessary for IE >= 10*/

        setTimeout(() => {
          // Delay to ensure QR code is fully rendered
          printWindow.print();
          printWindow.close();
        }, 1000); // Adjust time as necessar
      }

      return true;
    }
  };


  return (
    <Dropdown.Item onClick={handlePrint}>
      <div ref={printRef} className="d-none">
        <QRCodeGenerator testId={testId} totalSlides={totalSlides} testType={testType} />
      </div>
      <KTIcon iconName="printer" className="fs-3 me-3" />
      Print Label
    </Dropdown.Item>
  );
};

export { PrintQrCode };
