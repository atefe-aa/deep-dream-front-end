import clsx from "clsx";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { Link } from "react-router-dom";
import { HeaderNotificationsMenu } from "../../../_metronic/partials";
import { useAuth } from "../../modules/auth";
import { hasRole } from "../../utils/helper";

type Props = {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
};

const AsideTabs: FC<Props> = ({ link, setLink }) => {
  const { currentUser } = useAuth();

  // Function to generate tabs based on roles
  const generateTabs = () => {
    let baseTabs = [
      {
        link: "/user-management/users",
        icon: "people",
        tooltip: "Laboratories",
      },
    ];

    if (currentUser && hasRole(currentUser,"superAdmin")) {
      baseTabs = [
        ...baseTabs,
        {
          link: "/settings/all",
          icon: "setting-4",
          tooltip: "Settings",
        },
        {
          link: "/manual-mode",
          icon: "joystick",
          tooltip: "Manual Mode",
        },
      ];
    }

    return baseTabs;
  };

  // Use useMemo to memoize the tabs array
  const tabs = useMemo(generateTabs, [currentUser]);

  return (
    <div
      className="hover-scroll-y mb-10"
      data-kt-scroll="true"
      data-kt-scroll-activate="{default: false, lg: true}"
      data-kt-scroll-height="auto"
      data-kt-scroll-wrappers="#kt_aside_nav"
      data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
      data-kt-scroll-offset="0px"
    >
      {/* begin::Nav */}
      <ul className="nav flex-column d-flex align-items-center justify-content-center" id="kt_aside_nav_tabs">
        <li className="mb-10 text-center">
          {/* begin::User */}
          <div
            className="d-flex align-items-center justify-content-center mb-1"
            id="kt_header_user_menu_toggle"
          >
            <div
              className=" cursor-pointer symbol symbol-40px "
              title="User profile"
            >
              <img
                src={currentUser?.data.picture || toAbsoluteUrl("/media/avatars/blank.png")}
                alt="avatar"
              />
            </div>
          </div>
          <span className="fs-7 text-muted fw-bold ">{currentUser?.data.labName || currentUser?.data.name}</span>
          {/* end::User */}
        </li>
        {/* begin::Nav item */}
        {tabs.map((t) => (
          <li key={t.link} data-bs-toggle="tooltip" title={t.tooltip}>
            {/* begin::Nav link */}
            <Link
              to={t.link}
              className={clsx(
                "nav-link btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light",
                { active: t.link === link }
              )}
              onClick={() => setLink(t.link)}
            >
              <KTIcon iconName={t.icon} className="fs-2x" />
            </Link>
            {/* end::Nav link */}
          </li>
        ))}
        <li>
          {/* begin::Notifications */}
          <div className="d-flex align-items-center ">
            {/* begin::Menu wrapper */}
            <div
              className="btn btn-icon btn-active-color-primary btn-color-gray-500 btn-active-light"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-start"
              data-kt-menu-flip="top-end"
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
        </li>

        <li>
          {/* begin::log out */}
          <div
            data-bs-toggle="modal"
            data-bs-target="#confirm_signout"
            className="d-flex align-items-center mb-10"
          >
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
        </li>
        {/* end::Nav link */}
      </ul>
      {/* end::Tabs */}
    </div>
  );
};

export { AsideTabs };
