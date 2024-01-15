import clsx from "clsx";
import { Dispatch, FC, SetStateAction } from "react";
import { KTIcon } from "../../../_metronic/helpers";
import { Link } from "react-router-dom";
import { HeaderNotificationsMenu } from "../../../_metronic/partials";
import { useAuth } from "../../modules/auth";

const tabs: ReadonlyArray<{ link: string; icon: string; tooltip: string }> = [
  {
    link: "/manual-mode",
    icon: "joystick",
    tooltip: "Manual Mode",
  },
  {
    link: "/user-management/users",
    icon: "people",
    tooltip: "Colleagues",
  },
  {
    link: "/settings/all",
    icon: "setting-4",
    tooltip: "Settings",
  },
];

type Props = {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
};

const AsideTabs: FC<Props> = ({ link, setLink }) => {
  const { logout } = useAuth();
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
      <ul className="nav flex-column" id="kt_aside_nav_tabs">
        {/* begin::Nav item */}
        {tabs.map((t) => (
          <li key={t.link}>
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
        </li>
        {/* end::Nav link */}
      </ul>
      {/* end::Tabs */}
    </div>
  );
};

export { AsideTabs };
