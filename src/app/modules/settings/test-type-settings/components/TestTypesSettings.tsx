import { CustomTable } from "../../../../ui/table/CustomTable";
import { TestTypesTableRow } from "./TestTypesTableRow";
import {
  KTCardBody,
  stringifyRequestQuery,
} from "../../../../../_metronic/helpers";
import { CustomTableHead } from "../../../../ui/table/CustomTableHead";
import { CustomHeaderCell } from "../../../../ui/table/CustomHeaderCell";
import { CustomTableBody } from "../../../../ui/table/CustomTableBody";
import { NoRecordRow } from "../../../../ui/table/NoRecordRow";
import { Pagination } from "../../../../ui/Pagination";
import { ListLoading } from "../../../../ui/ListLoading";
import { useTestTypes } from "../hooks/useTestTypes";
import { TestTypesModel } from "../core/_models";
import { useEffect, useMemo, useState } from "react";
import { useQueryRequest } from "../../../QueryRequestProvider";

function TestTypesSettings() {
  const { state, updateState } = useQueryRequest();
  const testTypesState = state.testTypes;

  const [query, setQuery] = useState<string>(
    stringifyRequestQuery(testTypesState)
  );
  const updatedQuery = useMemo(
    () => stringifyRequestQuery(testTypesState),
    [testTypesState]
  );

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery, query]);

  const { isLoading: isLoadingTestType, testTypes, meta } = useTestTypes(query);

  const onChangePage = (page: number) => {
    updateState("testTypes", { ...testTypesState, page });
  };

  const sortFunction = (sort: string, order: "asc" | "desc" | undefined) => {
    updateState("testTypes", { ...testTypesState, sort, order, page: 1 });
  };

  const columns = [
    "title",
    "Code",
    "Gender",
    "Type",
    "Num Layer",
    "Step",
    "Micro Step",
    "Z",
    "Condenser",
    "Brightness",
    "Magnification",
    "Description",
  ];
  return (
    <>
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

        <KTCardBody className="py-4">
          {/* <Search updateState={searchFunction} /> */}
          <div className="table-responsive">
            <CustomTable
              modalId="kt_modal_add_new_test_type"
              className="mb-5 mb-xl-8"
            >
              <CustomTableHead>
                {columns.map((col) => (
                  <CustomHeaderCell
                    updateState={sortFunction}
                    state={testTypesState}
                    key={col}
                    className=""
                    title={col.toLocaleUpperCase()}
                    elementId={col.replace(" ", "_")}
                  />
                ))}
              </CustomTableHead>
              <CustomTableBody>
                {!isLoadingTestType && testTypes.length === 0 && (
                  <NoRecordRow />
                )}

                {!isLoadingTestType &&
                  testTypes &&
                  testTypes.map((test: TestTypesModel, index: number) => (
                    <TestTypesTableRow
                      key={test.id}
                      index={index + 1}
                      testTypeData={test}
                    />
                  ))}
              </CustomTableBody>
            </CustomTable>
          </div>
          {!isLoadingTestType && testTypes && testTypes.length > 0 && (
            <Pagination onPageChange={onChangePage} meta={meta} />
          )}
          {isLoadingTestType && <ListLoading />}
        </KTCardBody>
      </div>
    </>
  );
}

export default TestTypesSettings;
