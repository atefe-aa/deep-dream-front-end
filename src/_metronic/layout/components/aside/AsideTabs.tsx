import clsx from "clsx";
import { Dispatch, FC, SetStateAction } from "react";
import { KTIcon } from "../../../helpers";
import { Link } from "react-router-dom";

const tabs: ReadonlyArray<{ link: string; icon: string; tooltip: string }> = [
  {
    link: "/live-view/view",
    icon: "eye",
    tooltip: "Live View",
  },
  {
    link: "/user-management/users",
    icon: "people",
    tooltip: "Colleagues",
  },
  {
    link: "/settings/ss",
    icon: "gear",
    tooltip: "Settings",
  },
];

type Props = {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
};

const AsideTabs: FC<Props> = ({ link, setLink }) => {
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
        {/* end::Nav link */}
      </ul>
      {/* end::Tabs */}
    </div>
  );
};

export { AsideTabs };
