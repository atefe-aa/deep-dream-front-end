import { TestTypesModel } from "../../../../settings/test-type-settings/core/_models";
import { useTestTypes } from "../../../../settings/test-type-settings/hooks/useTestTypes";
import Select, { SingleValue } from "react-select";

interface Props {
  formik: any;
}

interface TestOption {
  value: number;
  label: string;
}

function TestTypeInput({ formik }: Props) {
  const query = `laboratory=${formik.values.laboratoryId}`;
  const { isLoading, testTypes } = useTestTypes(query);

  const testTypeOptions =
    !isLoading &&
    testTypes?.map((test: TestTypesModel) => ({
      value: test.id,
      label: `${test.code} - ${test.title}`,
    }));

  return (
    <div className="fv-row mb-3">
      {isLoading ? (
        <span>Loading Test Types List....</span>
      ) : (
        <>
          <label className="required form-label fw-bolder text-gray-900 fs-6 mb-0">
            Test Type
          </label>
          {testTypes && testTypes.length > 0 && (
            <Select
              {...formik.getFieldProps("testType")}
              theme={(theme) => ({
                ...theme,
                borderRadius: 7,
                colors: {
                  ...theme.colors,
                  primary25: "var(--bs-success-text-emphasis)",
                  neutral0: "var(--bs-modal-bg)",
                  neutral20: "var(--bs-gray-300)",
                  neutral80: "var(--bs-gray-700)",
                },
              })}
              options={testTypeOptions}
              isSearchable={true}
              placeholder="Choose the test type"
              onChange={(option: SingleValue<TestOption>) =>
                formik.setFieldValue("testType", option?.value)
              }
              value={testTypeOptions.find(
                (test: TestOption) =>
                  test.value === Number(formik.values.testType)
              )}
            />
          )}
        </>
      )}
      {formik.touched.testType && formik.errors.testType && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">
            <span role="alert">{formik.errors.testType}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export { TestTypeInput };
