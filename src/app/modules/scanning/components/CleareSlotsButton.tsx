import { ConfirmModal } from "../../../ui/modals/ConfirmModal";
import { useClearSlots } from "../hooks/useClearSlots";

type Props = {
  isLoading: boolean;
};

function ClearSlotsButton({ isLoading }: Props) {
  const { isClearing, clearSlots } = useClearSlots();

  return (
    <>
      <button
        data-bs-toggle="modal"
        data-bs-target="#confirm_cleareSlots"
        className="btn btn-danger ms-4"
        disabled={isLoading || isClearing}
      >
        {!isClearing && <span className="indicator-label">Cleare Slots</span>}
        {isClearing && (
          <span className="indicator-progress" style={{ display: "block" }}>
            Please wait...
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        )}
      </button>

      <ConfirmModal
        actionName="cleareSlots"
        onConfirm={clearSlots}
        message="All slots will be empty.Are you sure?"
        isLoading={isClearing}
      />
    </>
  );
}
export { ClearSlotsButton };
