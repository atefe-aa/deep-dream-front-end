import { useState } from "react";
import SettingItem from "../machine-settings/SettingItem";
import { LABS_TESTS_DATA, TEST_TYPES } from "../../../utils/constants";
import { TestTypesTable } from "../../../ui/table/test-types/TestTypesTable";
import { TestTypesTableRow } from "../../../ui/table/test-types/TestTypesTableRow";
import { TestTypesPriceTable } from "../../../ui/table/test-type-price/TestTypesPriceTable";
import { TestTypesPriceTableRow } from "../../../ui/table/test-type-price/TestTypesPriceTableRow";

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
          <SettingItem name="test_types" label="Test Types" show={true}>
            <TestTypesTable className="mb-5 mb-xl-8">
              {TEST_TYPES.map((test, index) => (
                <TestTypesTableRow
                  key={test.id}
                  index={index}
                  testTypeData={test}
                />
              ))}
            </TestTypesTable>
          </SettingItem>

          <SettingItem
            name="test_types_price"
            label="Test Type Prices"
            show={false}
          >
            {LABS_TESTS_DATA.map((lab, index) => (
              <SettingItem
                key={lab.id}
                name={`${lab.labName}_test_types_price`}
                label={`${lab.labName} Test Type Prices`}
                show={false}
              >
                <TestTypesPriceTable
                  tableTitle={lab.labName}
                  className="mb-5 mb-xl-8"
                >
                  {lab.tests.map((test) => (
                    <TestTypesPriceTableRow
                      key={test.id}
                      index={index}
                      testTypeData={test}
                    />
                  ))}
                </TestTypesPriceTable>
              </SettingItem>
            ))}
          </SettingItem>
        </div>
      </div>
    </div>
  );
}

export default TestTypesSettings;
