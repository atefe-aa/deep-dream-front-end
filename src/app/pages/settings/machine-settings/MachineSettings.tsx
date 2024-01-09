import { useState } from "react";
import { AsideMenuItem } from "../../../../_metronic/layout/components/aside/AsideMenuItem";
import { AsideMenuItemWithSub } from "../../../../_metronic/layout/components/aside/AsideMenuItemWithSub";
import SettingItem from "./SettingItem";
import { DEFAULT_SETTINGS } from "../../../utils/constants";
import SettingFormGroup from "./SettingFormGroup";

function MachineSettings() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="card mb-5 mb-xl-10">
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#machine_settings"
        aria-expanded="true"
        aria-controls="machine_settings"
      >
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Machine Settings</h3>
        </div>
      </div>

      <div id="machine_settings" className="collapse show">
        <div className="accordion px-10" id="accordionExample">
          <form
            //  onSubmit={formik.handleSubmit}
            noValidate
            className="form"
          >
            {DEFAULT_SETTINGS.map((set, _index) => (
              <SettingItem
                key={set.id}
                label={`Settings for ${set.magnification}x`}
                name={set.magnification.toString()}
                show={_index === 0}
              >
                <SettingFormGroup
                value={set.angle}
                  label="Angle"
                  type="number"
                  placeHolder="Angle"
                  inputName="Angle"
                />
                <SettingFormGroup
                value={set.b}
                  label="b Position"
                  type="number"
                  placeHolder="b position"
                  inputName="b"
                />
                {set.axis.map((ax) => (
                  <SettingFormGroup
                  value={ax.step}
                    key={ax.id}
                    label={ax.type}
                    type="number"
                    placeHolder={`Steps for ${ax.type} axis`}
                    inputName={ax.type}
                  />
                ))}
              </SettingItem>
            ))}

            <div className="card-footer d-flex justify-content-end py-6 px-9">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {!loading && "Save Changes"}
                {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...{" "}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MachineSettings;
