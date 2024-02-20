import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";

type Props = {
  testId: string;
  totalSlides: number;
  testType: string;
};

const QRCodeGenerator: React.FC<Props> = ({
  testId,
  totalSlides,
  testType,
}) => {
  const [qrImageUrl, setQrImageUrl] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const labels = Array.from({ length: totalSlides }, (_, index) => index + 1);

  useEffect(() => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const imageUrl = canvas.toDataURL("image/png");
        setQrImageUrl(imageUrl);
      }
    }
  }, [testId]);

  return (
    <>
      {labels.map((label) => (
        <div
          className="print-page"
          key={`label-${label}`}
          style={{
            display: "flex",
            alignItems: "start",
            height: "100%",
            margin:0,
            pageBreakAfter: "always", // Ensure each div starts on a new page
          }}
        >
          {/* Optionally render the image for visual confirmation */}
          {qrImageUrl && (
            <img
              src={qrImageUrl}
              alt="QR Code"
              style={{ width: "60px", height: "60px" }}
            />
          )}
           <div ref={qrRef} style={{ display: "none" }}>
            <QRCode value={testId} />
          </div>
          <div
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            <span className="fs-9">
              {testId}
            </span>
          </div>   <div
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            <span className="fs-9">
              {label}/{totalSlides}
            </span>
          </div>
          <div
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            <span className="fs-9">{testType}</span>
          </div>
        </div>
      ))}
  
    </>
  );
};

export default QRCodeGenerator;
