import SettingItem from "../../components/SettingItem";
import SettingFormGroup from "../../components/SettingFormGroup";
import { CustomTable } from "../../../../ui/table/CustomTable";
import { SlidesPlacementTableRow } from "../../slides/components/SlidesPlacementTableRow";
import { capitalizeWords } from "../../../../utils/helper";
import { useSettings } from "../hooks/useSettings";
import { Spinner } from "react-bootstrap";
import { SettingModel } from "../core/_models";
import { useUpdateSetting } from "../hooks/useUpdateSetting";
import { CustomTableHead } from "../../../../ui/table/CustomTableHead";
import { CustomHeaderCell } from "../../../../ui/table/CustomHeaderCell";
import { CustomTableBody } from "../../../../ui/table/CustomTableBody";

import { NoRecordRow } from "../../../../ui/table/NoRecordRow";
import { useSlides } from "../../slides/hooks/useSlides";

function MachineSettings() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  function handleUpdateSetting(e: any, id: number) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ value, id });
  }

  const { slides, isLoading: isLoadingSlides } = useSlides();
  const slidesColumns = ["Number", "SW x", "SW y", "NE x", "NE y"];
  return (
    <div className="card mb-5 mb-xl-10 pb-10">
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
          <div className="w-100 d-flex justify-content-center">Loading ... <Spinner animation="border" /></div>
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
                        label={capitalizeWords(item.key.replace(/-/g,' '))}
                        type="number"
                        placeHolder={capitalizeWords(item.key.replace(/-/g,' '))}
                        isLoading={isUpdating}
                        id={item.id}
                        inputName={`${item.key}-${item.id}-${set.id}`}
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
            <div className="table-responsive">
              <CustomTable
                tableTitle="Slides List"
                modalId="kt_modal_add_new_slide"
                className="mb-5 mb-xl-8"
              >
                <CustomTableHead>
                  {slidesColumns.map((col) => (
                    <CustomHeaderCell
                      updateState={() => {}}
                      state={""}
                      key={col}
                      className=""
                      title={col.toLocaleUpperCase()}
                      elementId={col.replace(" ", "-")}
                    />
                  ))}
                </CustomTableHead>
                <CustomTableBody>
                  {!isLoadingSlides && (slides?.length === 0 || !slides) && (
                    <NoRecordRow />
                  )}

                  {isLoadingSlides ? (
                    <tr>
                      <td colSpan={20}>
                        <div className="d-flex text-center w-100 align-content-center justify-content-center">
                          <Spinner animation="grow" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    slides &&
                    slides.map((slide: SlideModel, index: number) => (
                      <SlidesPlacementTableRow
                        key={slide.id}
                        data={slide}
                        index={index + 1}
                      />
                    ))
                  )}
                </CustomTableBody>
              </CustomTable>
            </div>
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
