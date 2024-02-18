import { KTIcon } from "../../../_metronic/helpers";
import { HeaderNotificationsMenu } from "../../../_metronic/partials";
import { NewIndicator } from "../../ui/NewIndicator";

function NotificationsButton(){

    return    <div className="d-flex align-items-center ">
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
      <NewIndicator />
    </div>
    {/* end::Menu wrapper */}
    <HeaderNotificationsMenu backgrounUrl="/media/misc/pattern-1.jpg" />
  </div>
}

export {NotificationsButton}