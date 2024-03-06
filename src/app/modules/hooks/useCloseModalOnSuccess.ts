import { useEffect } from "react";
import { Modal } from "bootstrap";

export function useCloseModalOnSuccess(
  modalId: string,
  data: any,
  formik: any
) {
  useEffect(() => {
    if (data && data?.data) {
      formik.resetForm();
      const modalElement = document.getElementById(modalId);
      if (modalElement) {
        const modalInstance =
          Modal.getInstance(modalElement) || new Modal(modalElement);
        modalInstance.hide();
      }
    }
  }, [data]);
}
