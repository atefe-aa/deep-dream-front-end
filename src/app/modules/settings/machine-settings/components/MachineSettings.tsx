import { useState } from "react";
import SettingItem from "../../components/SettingItem";
import {
  DEFAULT_SETTINGS,
  Slides_Placements,
} from "../../../../utils/constants";
import SettingFormGroup from "../../components/SettingFormGroup";
import Checkbox from "../../components/Checkbox";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CustomTable } from "../../../../ui/table/CustomTable";
import { SlidesPlacementTableRow } from "../../slides/components/SlidesPlacementTableRow";
import { capitalizeWords } from "../../../../utils/helper";
import { useSettings } from "../hooks/useSettings";
import { Spinner } from "react-bootstrap";
import { SettingModel } from "../core/_models";
import { useUpdateSetting } from "../hooks/useUpdateSetting";

function MachineSettings() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  function handleUpdateSetting(e: any, id: number) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ value, id });
  }

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
          {isLoading ? (
            <Spinner animation="grow" />
          ) : (
            settings &&
            settings.map(
              (set: SettingModel, _index: number) =>
                set.title !== "slides placement" && (
                  <SettingItem
                    key={set.id}
                    label={capitalizeWords(`Settings for ${set.title}`)}
                    name={capitalizeWords(set.title)}
                    show={false}
                  >
                    {set.settings.map((item) => (
                      <SettingFormGroup
                        value={item.value}
                        key={item.id}
                        label={capitalizeWords(item.key)}
                        type="number"
                        placeHolder={capitalizeWords(item.key)}
                        isLoading={isUpdating}
                        id={item.id}
                        inputName={item.key}
                        unit={item.unit}
                        handleBlur={handleUpdateSetting}
                      />
                    ))}
                  </SettingItem>
                )
            )
          )}
          <SettingItem
            name="slide_placement"
            label="Slide Placement"
            show={false}
          >
            {/* <CustomTable
                modalId="kt_modal_add_new_slide"
                className="mb-5 mb-xl-8"
                columns={["Number", "x", "y"]}
              >
                {Slides_Placements.map((slide, index) => (
                  <SlidesPlacementTableRow
                    key={slide.id}
                    index={index + 1}
                    data={slide}
                  />
                ))}
              </CustomTable> */}
          </SettingItem>
        </div>
      </div>
    </div>
  );
}

export default MachineSettings;
