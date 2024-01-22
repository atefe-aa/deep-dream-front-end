import { useState } from "react";
import { TEST_TYPES } from "../../../../utils/constants";
import { CustomTable } from "../../../../ui/table/CustomTable";
import { TestTypesTableRow } from "./TestTypesTableRow";

function TestTypesSettings() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="card mb-5 mb-xl-10 pb-10">
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

      <div id="test_types_settings " className="collapse show">
        <div className="accordion px-10 " id="accordionExample">
          <CustomTable
            modalId="kt_modal_add_new_test_type"
            className="mb-5 mb-xl-8"
            columns={[
              "Tilte",
              "Code",
              "Gender",
              "Type",
              "Number of Layers",
              "Z",
              "Condenseur",
              "Brightness",
              "Magnifications",
              "Description",
            ]}
          >
            {TEST_TYPES.map((test, index) => (
              <TestTypesTableRow
                key={test.id}
                index={index + 1}
                testTypeData={test}
              />
            ))}
          </CustomTable>
        </div>
      </div>
    </div>
  );
}

export default TestTypesSettings;
