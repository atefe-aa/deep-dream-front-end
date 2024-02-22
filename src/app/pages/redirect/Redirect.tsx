import { useEffect } from "react";
import { useThemeMode } from "../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { Spinner } from "react-bootstrap";
import { useGetLink } from "../../modules/auth/hooks/useGetFullLink";
import { Navigate, useParams } from "react-router-dom";

const BODY_CLASSES = ["bgi-size-cover", "bgi-position-center", "bgi-no-repeat"];
const Redirect = () => {
  const { mode } = useThemeMode();
  const { code } = useParams();

  const {isLoading,link}=useGetLink(code||"");
  
  useEffect(() => {
    BODY_CLASSES.forEach((c) => document.body.classList.add(c));
    document.body.style.backgroundImage =
      mode === "dark"
        ? `url(${toAbsoluteUrl("/media/auth/bg7-dark.jpg")})`
        : `url(${toAbsoluteUrl("/media/auth/bg7.jpg")})`;

    return () => {
      BODY_CLASSES.forEach((c) => document.body.classList.remove(c));
      document.body.style.backgroundImage = "none";
    };
  }, [mode]);

  if(!isLoading && link) return <Navigate to={link} />
  return (
    <div className="d-flex flex-column flex-root">
      <div className="d-flex flex-column flex-center flex-column-fluid">
        <div className="d-flex flex-column flex-center text-center p-10">
          <div className="card card-flush  w-lg-650px py-5">
            <div className="card-body py-15 py-lg-20">
              <>
                {/* begin::Title */}
                <h1 className="fw-bolder fs-2qx text-gray-900 mb-4">
                  Preparing data <Spinner animation="border" />
                </h1>
                {/* end::Title */}

                {/* begin::Text */}
                <div className="fw-semibold fs-6 text-gray-500 mb-7">
                  System is preparing data to redirect to the image page.
                </div>
                {/* end::Text */}

                {/* begin::Illustration */}
                <div className="mb-11">
                  <img
                    src={toAbsoluteUrl("/media/auth/agency.png")}
                    className="mw-100 mh-300px theme-light-show"
                    alt=""
                  />
                  <img
                    src={toAbsoluteUrl("/media/auth/agency-dark.png")}
                    className="mw-100 mh-300px theme-dark-show"
                    alt=""
                  />
                </div>
                {/* end::Illustration */}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Redirect };
