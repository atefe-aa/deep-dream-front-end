import { useAuth } from "../../modules/auth";
import { KTIcon } from "../../../_metronic/helpers";
import { HeaderNotificationsMenu } from "../../../_metronic/partials";

const AsideFooter = () => {
  const { logout } = useAuth();
  return (
    <div
      className="aside-footer d-flex flex-column align-items-center mt-3 flex-column-auto"
      id="kt_aside_footer"
    >
      {/* begin::Notifications */}
      <div className="d-flex align-items-center ">
        {/* begin::Menu wrapper */}
        <div
          className="btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="top-start"
          data-kt-menu-flip="bottom-end"
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

      {/* begin::log out */}
      <div onClick={logout} className="d-flex align-items-center mb-10">
        {/* begin::Menu wrapper */}
        <div
          className="btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light"
          data-bs-toggle="tooltip"
          title="Sign out"
        >
          <KTIcon iconName="exit-left" className="fs-2 text-lg-1" />
        </div>
        {/* end::Menu wrapper */}
      </div>
      {/* end::log out */}
    </div>
  );
};

export { AsideFooter };
