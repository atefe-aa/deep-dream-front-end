import { FC } from "react";

import { useState } from "react";
import { useFormik } from "formik";
import { ModalLayout } from "../../ui/modals/ModalLayout";

const initialValues = {
  number: 0,
  xPosition: 0,
  yPosition: 0,
};

type Props = {
  actionName: string;
  message: string;
  onConfirm: Function;
};

const ConfirmModal: React.FC<Props> = ({ actionName, message, onConfirm }) => {
  return (
    <ModalLayout modalId={`confirm_${actionName}`} title="Confirm Sign-out">
      <h4>{message}</h4>
      {/* begin::Actions */}
      <div className="text-center pt-15">
        <button data-bs-dismiss="modal" className="btn btn-light me-3">
          Discard
        </button>

        <button
          data-bs-dismiss="modal"
          onClick={() => onConfirm()}
          type="submit"
          className="btn btn-primary"
        >
          <span className="indicator-label">Confirm</span>
        </button>
      </div>
    </ModalLayout>
  );
};

export { ConfirmModal };
