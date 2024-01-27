import { useEffect, useMemo, useState } from "react";
import { useQueryRequest } from "../../../QueryRequestProvider";
import { useLaboratories } from "../hooks/useLaboratories";
import {
  KTCardBody,
  stringifyRequestQuery,
} from "../../../../../_metronic/helpers";
import { Search } from "../../../../ui/search-and-filter/Search";
import { CustomTable } from "../../../../ui/table/CustomTable";
import { CustomTableHead } from "../../../../ui/table/CustomTableHead";
import { CustomHeaderCell } from "../../../../ui/table/CustomHeaderCell";
import { CustomTableBody } from "../../../../ui/table/CustomTableBody";
import { NoRecordRow } from "../../../../ui/table/NoRecordRow";
import { LabsModel } from "../core/_models";
import { LaboratoryTableRow } from "./LaboratoryTableRow";
import { Pagination } from "../../../../ui/Pagination";
import { ListLoading } from "../../../../ui/ListLoading";
import { ConfirmModal } from "../../../../ui/modals/ConfirmModal";
import { useDeleteLaboratory } from "../hooks/useDeleteLaboratory";

function Laboratories() {
  const { state, updateState } = useQueryRequest();
  const laboratoriesState = state.laboratories;

  const [query, setQuery] = useState<string>(
    stringifyRequestQuery(laboratoriesState)
  );
  const updatedQuery = useMemo(
    () => stringifyRequestQuery(laboratoriesState),
    [laboratoriesState]
  );

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery, query]);
  const {
    isLoading: isLoadingLaboratories,
    laboratories,
    meta,
  } = useLaboratories(query);

  const onChangePage = (page: number) => {
    updateState("laboratories", { ...laboratoriesState, page });
  };

  const search = (searchTerm: string) => {
    updateState("laboratories", {
      ...laboratoriesState,
      search: searchTerm,
      page: 1,
    });
  };
  const sort = (sort: string, order: "asc" | "desc" | undefined) => {
    updateState("laboratories", { ...laboratoriesState, sort, order, page: 1 });
  };
  const { deleteLaboratory, isDeleting } = useDeleteLaboratory();

  const handleDelete = (labId: number) => {
    deleteLaboratory(labId);
  };
  const columns = ["Name", "username", "Phone", "Address", "Description"];
  return (
    <>
      <KTCardBody className="py-4">
        <Search updateState={search} />
        <div className="table-responsive">
          <CustomTable className="" modalId="kt_modal_add_new_laboratory">
            <CustomTableHead>
              {columns.map((col) => (
                <CustomHeaderCell
                  updateState={sort}
                  state={laboratoriesState}
                  key={col}
                  className=""
                  title={col.toLocaleUpperCase()}
                  elementId={col.replace(" ", "-")}
                />
              ))}
            </CustomTableHead>
            <CustomTableBody accordionId="labsPanel">
              {!isLoadingLaboratories &&
                (laboratories?.length === 0 || !laboratories) && (
                  <NoRecordRow />
                )}

              {!isLoadingLaboratories &&
                laboratories &&
                laboratories.map((lab: LabsModel, index: number) => (
                  <LaboratoryTableRow
                    key={lab.id}
                    labData={lab}
                    index={index + 1}
                  />
                ))}
            </CustomTableBody>
          </CustomTable>
        </div>
        {!isLoadingLaboratories && laboratories && (
          <Pagination onPageChange={onChangePage} meta={meta} />
        )}
        {isLoadingLaboratories && <ListLoading />}
      </KTCardBody>
      {/* begin:: Modals */}
      {!isLoadingLaboratories &&
        laboratories &&
        laboratories?.map((lab: LabsModel) => (
          <ConfirmModal
            key={lab.id}
            actionName={`delete${lab.id}`}
            onConfirm={() => handleDelete(lab.id)}
            isLoading={isDeleting}
            message={`Are you sure, you want to delete ${lab.labName}?`}
          />
        ))}
    </>
  );
}

export { Laboratories };
