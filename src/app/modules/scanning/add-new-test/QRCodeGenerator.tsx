import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

type Props = {
  number: string;
};

const QRCodeGenerator: React.FC<Props> = ({ number })  => {
  const [loading, setLoading] = useState(false);

  return (
    <div  className="text-center mb-13">
      <p>Test Number: {number}</p>
      <QRCode value={number} />
         {/* begin::Action */}
         <div className="d-grid m-10">
                    <button
                      type="button"
                      className="btn btn-primary"
                      // disabled={formik.isSubmitting || !formik.isValid}
                    >
                      {!loading && (
                        <span className="indicator-label">Print Label</span>
                      )}
                      {loading && (
                        <span
                          className="indicator-progress"
                          style={{ display: "block" }}
                        >
                          Please wait...
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                        </span>
                      )}
                    </button>
                  </div>
                  {/* end::Action */}
    </div>
  );
};

export default QRCodeGenerator;