import { KTCardBody, stringifyRequestQuery } from "../../../_metronic/helpers";
import { Search } from "../../ui/search-and-filter/Search";
import { CustomTable } from "../../ui/table/CustomTable";
import { useEffect, useMemo, useState } from "react";
import { useQueryRequest } from "../QueryRequestProvider";
import { useRegistration } from "./hooks/useRegistrations";
import { NoRecordRow } from "../../ui/table/NoRecordRow";
import { TestsModel } from "./core/_models";
import { PatientsTableRow } from "./components/PatientsTableRow";
import { ListLoading } from "../../ui/ListLoading";
import { Pagination } from "../../ui/Pagination";
import { CustomTableHead } from "../../ui/table/CustomTableHead";
import { CustomHeaderCell } from "../../ui/table/CustomHeaderCell";
import { CustomTableBody } from "../../ui/table/CustomTableBody";

export function Registrations() {
  const { state, updateState } = useQueryRequest();
  const patientsState = state.patients;

  const [query, setQuery] = useState<string>(
    stringifyRequestQuery(patientsState)
  );
  const updatedQuery = useMemo(
    () => stringifyRequestQuery(patientsState),
    [patientsState]
  );

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery, query]);

  const {
    isLoading: isLoadingRegistration,
    registrations,
    meta,
  } = useRegistration(query);

  const onChangePage = (page: number) => {
    updateState("patients", { ...patientsState, page });
  };

  const searchFunction = (searchTerm: string) => {
    updateState("patients", { ...patientsState, search: searchTerm, page: 1 });
  };

  const sortFunction = (sort: string, order: "asc" | "desc" | undefined) => {
    updateState("patients", { ...patientsState, sort, order, page: 1 });
  };

  const columns = [
    "registration",
    "Patient",
    "National ID",
    "registration Date & Time",
    "Sender Laboratory",
    "Progress",
  ];
  return (
    <KTCardBody className="py-4">
      <Search updateState={searchFunction} />
      <div className="table-responsive">
        <CustomTable className="" modalId="kt_modal_add_new_laboratory">
          <CustomTableHead>
            {columns.map((col) => (
              <CustomHeaderCell
                updateState={sortFunction}
                state={patientsState}
                key={col}
                className=""
                title={col.toLocaleUpperCase()}
                elementId={col==="registration Date & Time" ? 'date': col.replace(" ", "-")}
              />
            ))}
          </CustomTableHead>
          <CustomTableBody accordionId="labsPanel">
            {!isLoadingRegistration && registrations.length === 0 && (
              <NoRecordRow />
            )}

            {!isLoadingRegistration &&
              registrations &&
              registrations.map((tets: TestsModel, index: number) => (
                <PatientsTableRow key={tets.id} data={tets} index={index + 1} />
              ))}
          </CustomTableBody>
        </CustomTable>
      </div>
      {!isLoadingRegistration && registrations && (
        <Pagination onPageChange={onChangePage} meta={meta} />
      )}
      {isLoadingRegistration && <ListLoading />}
    </KTCardBody>
  );
}
