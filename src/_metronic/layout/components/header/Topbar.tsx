import { FC } from "react";
import { KTIcon } from "../../../helpers";
import { ThemeModeSwitcher } from "../../../partials";
import { Link } from "react-router-dom";
import { hasRole } from "../../../../app/utils/helper";
import { useAuth } from "../../../../app/modules/auth";

const Topbar: FC = () => {
  const { currentUser } = useAuth();
  return (
    <div className="d-flex flex-shrink-0">
      {/* begin::Add new test*/}
      <div className="d-flex ms-3">
        <a
          href="#"
          className="btn btn-flex flex-center bg-body btn-color-gray-700 btn-active-color-primary w-40px w-md-auto h-40px px-0 px-md-6"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_new_test"
        >
          <KTIcon iconName="plus" className="fs-2 text-primary me-0 me-md-2" />
          <span className="d-none d-md-inline">New Test</span>
        </a>
      </div>
      {/* end::Add new test*/}

      {/* begin::Start Scanning */}
      {currentUser && hasRole(currentUser, ["superAdmin", "operator"]) && (
        <div className="d-flex ms-3">
          <Link
            to="/scanning"
            className="btn btn-flex flex-center bg-body btn-color-gray-700 btn-active-color-primary w-40px w-md-auto h-40px px-0 px-md-6"
          >
            <KTIcon
              iconName="document"
              className="fs-2 text-primary me-0 me-md-2"
            />
            <span className="d-none d-md-inline">Start Scanning</span>
          </Link>
        </div>
      )}
      {/* end::Start Scanning */}

      {/* begin::Theme mode */}
      <div className="d-flex align-items-center  ms-3">
        <ThemeModeSwitcher toggleBtnClass=" flex-center bg-body btn-color-gray-600 btn-active-color-primary h-40px" />
      </div>
      {/* end::Theme mode */}
    </div>
  );
};

export { Topbar };
