import React, { useState, useEffect, useRef, useMemo } from "react";
import QRCode from "qrcode.react";

type Props = {
  testId: number;
  totalSlides: number;
  testType: string;
};

const QRCodeGenerator: React.FC<Props> = ({
  testId,
  totalSlides,
  testType,
}) => {
  // const [qrImageUrls, setQrImageUrls] = useState<string[]>([]);
  // const qrRefs = useRef<Array<HTMLDivElement null>>([]);
  const [qrImageUrls, setQrImageUrls] = useState<string[]>([]);
  const qrRefs = useRef<Array<HTMLDivElement | null>>([]);
  const labels = useMemo(() => {
    return Array.from({ length: totalSlides }, (_, index) => {
      return { slideNumber: index + 1, testId };
    });
  }, [testId, totalSlides]);

  useEffect(() => {
    const imageUrls: string[] = [];
    labels.forEach((label, index) => {
      const canvas = qrRefs.current[index]?.querySelector("canvas");
      if (canvas) {
        const imageUrl = canvas.toDataURL("image/png");
        imageUrls.push(imageUrl);
      }
    });
    setQrImageUrls(imageUrls);
  }, [labels]);

  return (
    <>
      {labels.map((label, index) => {
        const qrCodeValue = JSON.stringify(label);
        return (
          <div
            className="print-page"
            key={`label-${label.slideNumber}`}
            style={{
              display: "flex",
              alignItems: "start",
              height: "100%",
              margin: 0,
              pageBreakAfter: "always", // Ensure each div starts on a new page
            }}
          >
            {/* Optionally render the image for visual confirmation */}
            {qrImageUrls[index] && (
              <img
                src={qrImageUrls[index]}
                alt="QR Code"
                style={{ width: "60px", height: "60px" }}
              />
            )}
            <div ref={el => qrRefs.current[index] = el} style={{ display: "none" }}>
              <QRCode value={qrCodeValue} />
            </div>
            <div
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              <span className="fs-9">{testId}</span>
            </div>
            <div
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              <span className="fs-9">
                {label.slideNumber}/{totalSlides}
              </span>
            </div>
            <div
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              <span className="fs-9">{testType}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default QRCodeGenerator;
