import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useRef, useState } from "react";
import { ReportTemplateModel } from "../_model";
import { Report } from "./Report";
import { useAuth } from "../../auth";
import { ReportHeader } from "./ReportHeader";
import { ReportPatient } from "./ReportPatient";
import { TestsModel } from "../../tests/core/_models";
import { ReportFooter } from "./ReportFooter";
import { ReportSignature } from "./ReportSignature";
import { PrintableReport } from "./PrintableReport";

type Props = {
  template: ReportTemplateModel | undefined;
  formik: any;
  isCreating: boolean;
  test: TestsModel;
};

const ExportPdf: React.FC<Props> = ({ template, formik, isCreating, test }) => {
  const printRef = useRef<HTMLDivElement>(null);

  // const handlePrint = () => {
  //   if (printRef.current) {
  //     const printWindow = window.open(
  //       "",
  //       "PRINT",
  //       "height=650,width=900,top=100,left=150"
  //     );

  //     // Ensure the window opened
  //     if (printWindow && printWindow.document) {
  //       printWindow.document.write(
  //         `<html><head><title>${test.name}-${test.id}</title>`
  //       );
  //       // Optionally, add any required styles here
  //       printWindow.document.write("</head><body>");
  //       printWindow.document.write(printRef.current.innerHTML);
  //       printWindow.document.write("</body></html>");

  //       printWindow.document.close(); // necessary for IE >= 10
  //       printWindow.focus(); // necessary for IE >= 10*/

  //       setTimeout(() => {
  //         // Delay to ensure QR code is fully rendered
  //         printWindow.print();
  //         printWindow.close();
  //       }, 1000); // Adjust time as necessar
  //     }

  //     return true;
  //   }
  // };

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open(
        "",
        "PRINT",
        "height=650,width=900,top=100,left=150"
      );

      // Ensure the window opened
      if (printWindow && printWindow.document) {
        printWindow.document.write(
          `<html><head><title>${test.name}-${test.id}</title>`
        );
        // Optionally, add any required styles here
        printWindow.document.write("</head><body>");

        // Pagination logic
        let contentToPrint = printRef.current.innerHTML;
        let contentPages = [];
        const pageHeight = 1500; // Adjust height as needed
        while (contentToPrint.length > 0) {
          const nextPageContent = contentToPrint.substring(0, pageHeight);
          contentPages.push(nextPageContent);
          contentToPrint = contentToPrint.substring(pageHeight);
        }

        contentPages.forEach((pageContent, index) => {
          if (index > 0) {
            printWindow.document.write('<div style=""></div>');
          }
          printWindow.document.write(pageContent);
        });

        printWindow.document.write("</body></html>");

        printWindow.document.close(); // necessary for IE >= 10
        printWindow.focus(); // necessary for IE >= 10*/

        setTimeout(() => {
          // Delay to ensure QR code is fully rendered
          printWindow.print();
          printWindow.close();
        }, 1000); // Adjust time as necessary
      }

      return true;
    }
  };
  return (
    <>
      <button className="btn btn-info" type="button" onClick={handlePrint}>
        <KTIcon iconName="exit-up" className="fs-2" />
        Export PDF
      </button>
      <div className="d-none" ref={printRef}>
        <ReportHeader />
        <ReportPatient test={test} />
        <PrintableReport
          formik={formik}
          isCreating={isCreating}
          template={template}
        />
        <ReportSignature />
        <ReportFooter />
      </div>
    </>
  );
};
export { ExportPdf };
