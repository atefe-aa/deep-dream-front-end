import { useState } from "react";
import SettingFormGroup from "../machine-settings/SettingFormGroup";
import SettingItem from "../machine-settings/SettingItem";
import { DEFAULT_SETTINGS, TEST_TYPES } from "../../../utils/constants";
import Magnifications from "../machine-settings/Magnifications";
import MagnificationCheckbox from "../machine-settings/MagnificationCheckbox";

function TestTypesSettings() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="card mb-5 mb-xl-10">
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#test_types_settings"
        aria-expanded="true"
        aria-controls="test_types_settings"
      >
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Test Types Settings</h3>
        </div>
      </div>

      <div id="test_types_settings" className="collapse show">
        <div className="accordion px-10" id="accordionExample">
          <form
            //  onSubmit={formik.handleSubmit}
            noValidate
            className="form"
          >
            {TEST_TYPES.map((test, _index) => (
              <SettingItem
                key={test.id}
                name={test.title}
                label={test.title}
                show={_index === 0}
              >
                <Magnifications>
                  {DEFAULT_SETTINGS.map((set) => (
                    <MagnificationCheckbox
                      label={`${set.magnification}x`}
                      isChecked={
                        test.magnifications.find((mag) => set.id === mag)
                          ? true
                          : false
                      }
                    />
                  ))}
                </Magnifications>
                {test.prices.map((price) => (
                  <SettingFormGroup
                    value={price.price}
                    key={price.id}
                    label={price.lab.name}
                    type="number"
                    placeHolder={`Price for ${price.lab.name}`}
                    inputName={price.lab.name}
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

export default TestTypesSettings;
