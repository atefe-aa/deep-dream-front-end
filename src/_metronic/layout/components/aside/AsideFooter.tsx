import { useAuth } from "../../../../app/modules/auth";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import {
  HeaderNotificationsMenu,
  HeaderUserMenu,
  QuickLinks,
} from "../../../partials";

const AsideFooter = () => {
  const { logout} = useAuth()
  return (
    <div
      className="aside-footer d-flex flex-column align-items-center mt-3 flex-column-auto"
      id="kt_aside_footer"
    >
      {/* begin::log out */}
      <div onClick={logout}  className="d-flex align-items-center mb-1">
        {/* begin::Menu wrapper */}
        <div
          className="btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light"
          data-bs-toggle="tooltip"
          title="Sign out"
        >
          <i className="bi bi-box-arrow-right fs-2"></i>
        </div>
        {/* end::Menu wrapper */}
        <HeaderNotificationsMenu backgrounUrl="/media/misc/pattern-1.jpg" />
      </div>
      {/* end::log out */}

      {/* begin::Notifications */}
      <div className="d-flex align-items-center mb-5">
        {/* begin::Menu wrapper */}
        <div
          className="btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light"
          data-kt-menu-trigger="click"
          data-kt-menu-overflow="true"
          data-kt-menu-placement="top-start"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          data-bs-dismiss="click"
          title="Notifications"
        >
          <KTIcon iconName="notification" className="fs-2 text-lg-1" />
        </div>
        {/* end::Menu wrapper */}
        <HeaderNotificationsMenu backgrounUrl="/media/misc/pattern-1.jpg" />
      </div>
      {/* end::Notifications */}
    </div>
  );
};

export { AsideFooter };
