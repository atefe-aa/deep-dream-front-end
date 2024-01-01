import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useLayout } from "../../core";
import { KTIcon, toAbsoluteUrl } from "../../../helpers";
import { AsideTabs } from "./AsideTabs";
import { AsideFooter } from "./AsideFooter";
import { TabsBase } from "./Tabs/_TabsBase";

const AsideDefault = () => {
  const { config } = useLayout();
  const { classes } = useLayout();
  const [link, setLink] = useState<string>("");

  return (
    <div
      id="kt_aside"
      className={clsx("aside aside-extended", classes.aside.join(" "))}
      data-kt-drawer="true"
      data-kt-drawer-name="aside"
      data-kt-drawer-activate="{default: true, lg: false}"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="auto"
      data-kt-drawer-direction="start"
      data-kt-drawer-toggle="#kt_aside_toggle"
    >
      {/* begin::Primary */}
      <div className="aside-primary d-flex flex-column align-items-lg-center flex-row-auto">
        {/* begin::Logo */}
        <div
          className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-10"
          id="kt_aside_logo"
        >
          <Link to="/dashboard">
            <img
              src={toAbsoluteUrl("/media/logos/logo-large.png")}
              alt="logo"
              className="h-35px"
            />
          </Link>
        </div>
        {/* end::Logo */}

        <AsideFooter />
        {/* begin::Nav */}
        <div
          className="aside-nav d-flex flex-column align-items-center flex-column-fluid w-100 pt-5 pt-lg-0"
          id="kt_aside_nav"
        >
          <AsideTabs link={link} setLink={setLink} />
        </div>
        {/* end::Nav */}
      </div>
      {/* end::Primary */}
    </div>
  );
};

export { AsideDefault };
