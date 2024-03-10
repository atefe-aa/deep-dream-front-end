import { KTIcon } from "../../../_metronic/helpers";

type Props = {
  children: React.ReactNode;
  modalId: string;
  title: string;
  size?:"sm"|"lg",
  onClose?: () => void;
};

const ModalLayout: React.FC<Props> = ({
  children,
  modalId,
  title,
  size="sm",
  onClose = () => {},
}) => {
  return (
    <div className="modal fade" id={modalId} aria-hidden="true">
      <div className={`modal-dialog ${size==='lg'?"mw-850px":"mw-650px"}`}>
        <div className="modal-content">
          <div className="modal-header mb-5">
            {/* begin::Modal title */}
            <h2 className="fw-bolder">{title}</h2>

            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              <KTIcon iconName="cross" className="fs-1" />
            </div>
          </div>
          <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ModalLayout };
