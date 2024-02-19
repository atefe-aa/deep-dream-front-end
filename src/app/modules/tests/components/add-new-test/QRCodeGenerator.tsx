// import React, { useState, useEffect } from 'react';
// import QRCode from 'qrcode.react';

// type Props = {
//   number: string;
// };

// const QRCodeGenerator: React.FC<Props> = ({ number })  => {

//   return (
//     <div  className="text-center mb-13">
//       <p>admit: {number}- 1/3</p>
//       <QRCode value={number} />
//     </div>
//   );
// };

// export default QRCodeGenerator;


import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';

type Props = {
  number: string;
};

const QRCodeGenerator: React.FC<Props> = ({ number }) => {
  const [qrImageUrl, setQrImageUrl] = useState('');
  const qrRef = useRef(null);

  useEffect(() => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const imageUrl = canvas.toDataURL('image/png');
        setQrImageUrl(imageUrl);
      }
    }
  }, [number]); // Dependency array ensures this runs when `number` changes

  return (
    <div className="text-center mb-13">
      <p  style={{fontSize:"10px"}}>admit: {number} - 1/3</p>
      {/* Render the QRCode and reference the canvas */}
      <div ref={qrRef} style={{display:"none"}}>
        <QRCode value={number} />
      </div>
      {/* Optionally render the image for visual confirmation */}
      {qrImageUrl && <img src={qrImageUrl} alt="QR Code" style={{ width:'60px',height:"60px"}} />}
    </div>
  );
};

export default QRCodeGenerator;
