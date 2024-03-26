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
  isLoading?: boolean;
};

const ConfirmModal: React.FC<Props> = ({
  actionName,
  message,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <ModalLayout modalId={`confirm_${actionName}`} title="Confirm Action">
      <h4>{message}</h4>
      {/* begin::Actions */}
      <div className="text-center pt-15">
        <button
          data-bs-dismiss="modal"
          className="btn btn-light-danger me-3"
          disabled={isLoading}
        >
          Discard
        </button>

        <button
          data-bs-dismiss="modal"
          onClick={() => onConfirm()}
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          <span className="indicator-label">Confirm</span>
        </button>
      </div>
    </ModalLayout>
  );
};

export { ConfirmModal };
