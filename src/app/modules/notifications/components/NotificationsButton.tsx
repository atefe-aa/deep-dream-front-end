import { Spinner } from "react-bootstrap";
import { KTIcon } from "../../../../_metronic/helpers";
import { useCheckNotifications } from "../hooks/useCheckNotifications";
import { NewIndicator } from "./NewIndicator";
import { NotificationsMenu } from "./NotificationsMenu";
import { useNotifications } from "../hooks/useNotifications";
import { useMarkAsRead } from "../hooks/useMarkAsRead";

function NotificationsButton() {
  const { isLoading, isNew } = useCheckNotifications();
  const { markAsRead } = useMarkAsRead();

  return (
    <div className="d-flex align-items-center " onClick={()=>markAsRead()}>
      {/* begin::Menu wrapper */}
      <div
        className="btn btn-icon position-relative btn-active-color-primary btn-color-gray-500 btn-active-light"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-start"
        data-kt-menu-flip="top-end"
        data-bs-toggle="tooltip"
        data-bs-placement="right"
        data-bs-dismiss="click"
        title="Notifications"
      >
        <KTIcon iconName="notification" className="fs-2 text-lg-1" />
        {isLoading && <Spinner animation="grow" size="sm" />}
        {!isLoading && isNew && <NewIndicator />}
      </div>
      {/* end::Menu wrapper */}
      <NotificationsMenu backgrounUrl="/media/misc/pattern-1.jpg" />
    </div>
  );
}

export { NotificationsButton };
