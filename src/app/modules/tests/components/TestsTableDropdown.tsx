import { FC, useRef } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { CustomDropdown } from "../../../ui/dropdown/CustomDropdown";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TestsModel } from "../core/_models";
import QRCodeGenerator from "./add-new-test/QRCodeGenerator";

type Props = {
  data: TestsModel;
};

const TestsTableDropdown: FC<Props> = ({ data }) => {
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

        setTimeout(() => {  // Delay to ensure QR code is fully rendered
          printWindow.print();
          printWindow.close();
        }, 1000); // Adjust time as necessar
      }

      return true;
    }
  };

  const queryStr = `?project=${data.project}&image=${data.img}`;
  return (
    <>
      <CustomDropdown>
        <Dropdown.Item
          data-bs-toggle="modal"
          data-bs-target={`#edit_test_info${data.id}`}
        >
          <KTIcon iconName="pencil" className="fs-3 me-3" />
          Edit Info
        </Dropdown.Item>
        <Dropdown.Item onClick={handlePrint}>
          <div ref={printRef} className="d-none">
            <QRCodeGenerator testId="225265" totalSlides={5} testType="colon" />
          </div>
          <KTIcon iconName="printer" className="fs-3 me-3" />
          Print Label
        </Dropdown.Item>
        {data.img && data.project && (
          <Dropdown.Item>
            <Link
              to={`/image${queryStr}`}
              className="text-gray-900  text-hover-primary fs-6"
            >
              <KTIcon iconName="eye" className="fs-3 me-3" />
              View Image
            </Link>
          </Dropdown.Item>
        )}
        <Dropdown.Item
          data-bs-toggle="modal"
          // data-bs-target={`#edit_media${labData.id}`}
        >
          <KTIcon iconName="document" className="fs-3 me-3" />
          Download Report
        </Dropdown.Item>
        <Dropdown.Item
          data-bs-toggle="modal"
          // data-bs-target={`#edit_media${labData.id}`}
        >
          <KTIcon iconName="picture" className="fs-3 me-3" />
          View Slide Image
        </Dropdown.Item>
        <Dropdown.Item
          className="text-danger "
          data-bs-toggle="modal"
          data-bs-target={`#confirm_delete_test${data.id}`}
        >
          <KTIcon iconName="trash" className="fs-3 me-3" />
          Delete Test
        </Dropdown.Item>
      </CustomDropdown>
    </>
  );
};

export { TestsTableDropdown };
