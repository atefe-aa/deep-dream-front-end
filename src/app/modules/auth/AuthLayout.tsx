import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100%";
    }
    return () => {
      if (root) {
        root.style.height = "auto";
      }
    };
  }, []);

  return (
    <div
      className="d-flex flex-column flex-lg-row flex-column-fluid h-100"
      style={{
        backgroundImage: `url(${toAbsoluteUrl("/media/auth/bg3.jpg")})`,
      }}
    >
      {/* begin::Body */}
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1">
        {/* begin::Form */}
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          <div className="text-center ">
            <img
              src={toAbsoluteUrl("/media/logos/logo-large.png")}
              alt="logo"
              className="h-50px h-lg-80px"
            />
          </div>
            <span className="text-success mb-11" style={{fontWeight:"bolder"}}>Deep Dream</span>
          {/* begin::Wrapper */}
          <div className="bg-body rounded w-lg-500px p-10">
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { AuthLayout };
