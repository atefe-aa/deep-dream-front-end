import { useState } from "react";
import clsx from "clsx";
import { useLayout } from "../../../_metronic/layout/core";
import { AsideTabs } from "./AsideTabs";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

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
      <div className="aside-primary d-flex flex-column  mt-10 align-items-lg-center flex-row-auto">
       
            {/* begin::Logo */}
            <Link to="/dashboard" className="d-lg-flex d-none  align-items-center">
            <img
              alt="Logo"
              src={toAbsoluteUrl("/media/logos/demo7.svg")}
              className="h-30px"
            />
          </Link>
          {/* end::Logo */}
       
        {/* begin::Nav */}
        <div
          className="aside-nav d-flex flex-column align-items-center mt-8 flex-column-fluid w-100 pt-5 pt-lg-0"
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
