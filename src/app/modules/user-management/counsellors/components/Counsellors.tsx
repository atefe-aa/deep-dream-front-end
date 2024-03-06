import { useEffect, useMemo, useState } from "react";
import { useQueryRequest } from "../../../QueryRequestProvider";
// import { usecounsellors } from "../hooks/usecounsellors";
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
// import { LabsModel } from "../core/_models";
// import { CounsellorTableRow } from "./CounsellorTableRow";
import { Pagination } from "../../../../ui/Pagination";
import { ListLoading } from "../../../../ui/ListLoading";
import { ConfirmModal } from "../../../../ui/modals/ConfirmModal";
import { CounsellorTableRow } from "./CounsellorTableRow";
import { CounsellorModel } from "../core/_models";
import { useCounsellors } from "../hooks/useCounsellors";
// import { useDeleteCounsellor } from "../hooks/useDeleteCounsellor";

function Counsellors() {
  const { state, updateState } = useQueryRequest();
  const counsellorsState = state.counsellors;

  const [query, setQuery] = useState<string>(
    stringifyRequestQuery(counsellorsState)
  );
  const updatedQuery = useMemo(
    () => stringifyRequestQuery(counsellorsState),
    [counsellorsState]
  );

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery, query]);
  const {
    isLoading: isLoadingCounsellors,
    counsellors,
    meta,
  } = useCounsellors(query);

  const onChangePage = (page: number) => {
    updateState("counsellors", { ...counsellorsState, page });
  };

  const search = (searchTerm: string) => {
    updateState("counsellors", {
      ...counsellorsState,
      search: searchTerm,
      page: 1,
    });
  };
  const sort = (sort: string, order: "asc" | "desc" | undefined) => {
    updateState("counsellors", { ...counsellorsState, sort, order, page: 1 });
  };
  // const { deleteCounsellor, isDeleting } = useDeleteCounsellor();

  const handleDelete = (labId: number) => {
    // deleteCounsellor(labId);
  };
  const columns = ["Name", "laboratory", "Phone", "Description"];
  return (
    <>
      <KTCardBody className="py-4">
        <Search updateState={search} />
        <div className="table-responsive">
          <CustomTable
            tableTitle="Counsellors List"
            className=""
            modalId="kt_modal_add_new_counsellor"
          >
            <CustomTableHead>
              {columns.map((col) => (
                <CustomHeaderCell
                  updateState={sort}
                  state={counsellorsState}
                  key={col}
                  className=""
                  title={col.toLocaleUpperCase()}
                  elementId={col.replace(" ", "-")}
                />
              ))}
            </CustomTableHead>
            <CustomTableBody accordionId="labsPanel">
              {!isLoadingCounsellors &&
                (counsellors?.length === 0 || !counsellors) && <NoRecordRow />}

              {!isLoadingCounsellors &&
                counsellors &&
                counsellors.map(
                  (counsellor: CounsellorModel, index: number) => (
                    <CounsellorTableRow
                      key={counsellor.id}
                      counsellorData={counsellor}
                      index={index + 1}
                    />
                  )
                )}
            </CustomTableBody>
          </CustomTable>
        </div>
        {!isLoadingCounsellors && counsellors && meta && (
          <Pagination onPageChange={onChangePage} meta={meta} />
        )}
        {isLoadingCounsellors && <ListLoading />}
      </KTCardBody>
      {/* begin:: Modals */}
      {!isLoadingCounsellors &&
        counsellors &&
        counsellors?.map((counsellor: CounsellorModel) => (
          <ConfirmModal
            key={counsellor.id}
            actionName={`delete${counsellor.id}`}
            onConfirm={() => {}}
            isLoading={false}
            message={`Are you sure, you want to delete ${counsellor.name}?`}
          />
        ))}
    </>
  );
}

export { Counsellors };
