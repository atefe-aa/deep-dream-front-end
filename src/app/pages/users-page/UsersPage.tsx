import { CustomTable } from "../../ui/table/CustomTable";
import { LABS_TESTS_DATA, counsellorsData } from "../../utils/constants";
import { AddNewLaboratory } from "../../modules/user-management/laboratories/components/modals/AddNewLaboratory";
import { Pagination } from "../../ui/Pagination";
import { AddNewCounsellor } from "../../modules/user-management/counsellors/components/AddNewCounsellor";
import { AddNewTestPrice } from "../../modules/user-management/laboratories/test-type-price-setting/components/AddNewTestPrice";
import { UsersListSearchComponent } from "../../modules/user-management/laboratories/components/header/UsersListSearchComponent";
import { LaboratoryTableRow } from "../../modules/user-management/laboratories/components/LaboratoryTableRow";
import { CounsellorTableRow } from "../../modules/user-management/counsellors/components/CounsellorTableRow";
import { useLaboratories } from "../../modules/user-management/laboratories/hooks/useLaboratories";
import { ListLoading } from "../../ui/ListLoading";
import { NoRecordRow } from "../../ui/table/NoRecordRow";
import { LabsModel } from "../../modules/user-management/laboratories/core/_models";
import { ConfirmModal } from "../../ui/modals/ConfirmModal";
import { useDeleteLaboratory } from "../../modules/user-management/laboratories/hooks/useDeleteLaboratory";
import { KTCardBody, stringifyRequestQuery } from "../../../_metronic/helpers";
import { useQueryRequest } from "../../ui/table/QueryRequestProvider";
import { useEffect, useMemo, useState } from "react";
import { Search } from "../../ui/search-and-filter/Search";

const UsersPage = () => {
  const { state, updateState } = useQueryRequest();
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery]);

  const { isLoading: isLoadingLaboratories, laboratories, meta } =
    useLaboratories(query);

  const { deleteLaboratory, isDeleting } = useDeleteLaboratory();

  const handleDelete = (labId: number) => {
    deleteLaboratory(labId);
  };

  const onChangePage = (page: number) => {
    updateState({ ...state, page });
  };


  return (
    <>
      <KTCardBody className="py-4">
        <Search />
        <div className="table-responsive">
          <CustomTable
            className=""
            accordionId="labsPanel"
            columns={["Name", "username", "Phone", "Address", "Description"]}
            modalId="kt_modal_add_new_laboratory"
          >
            {!isLoadingLaboratories && !laboratories && <NoRecordRow />}

            {!isLoadingLaboratories &&
              laboratories &&
              laboratories.map((lab: LabsModel, index: number) => (
                <LaboratoryTableRow
                  key={lab.id}
                  labData={lab}
                  index={index + 1}
                />
              ))}
          </CustomTable>
        </div>
        {!isLoadingLaboratories && laboratories && (
          <Pagination
          onPageChange={onChangePage}
           meta={meta}
          />
        )}
        {isLoadingLaboratories && <ListLoading />}
      </KTCardBody>

      <div className="mt-10">
        <CustomTable
          tableTitle="Counsellors List"
          className=""
          columns={["Name", "Phone", "Laboratory"]}
          modalId="kt_modal_add_new_counsellor"
        >
          {counsellorsData.map((counsellor, index) => (
            <CounsellorTableRow
              key={counsellor.id}
              counsellorData={counsellor}
              index={index + 1}
            />
          ))}
        </CustomTable>

        {/* <Pagination totalItems={laboratories?.length()} itemsPerPage={} currentPage={} onPageChange={} /> */}
      </div>

      {/* modal */}
      {/* begin:: Modals */}
      {!isLoadingLaboratories &&
        laboratories &&
        laboratories?.map((lab: LabsModel) => (
          <ConfirmModal
            key={lab.id}
            actionName={`delete${lab.id}`}
            onConfirm={() => handleDelete(lab.id)}
            message={`Are you sure, you want to delete ${lab.labName}?`}
          />
        ))}

      {/* end:: Modals */}

      <AddNewLaboratory />

      <AddNewCounsellor />
      {LABS_TESTS_DATA.map((lab) => (
        <AddNewTestPrice key={lab.id} labName={lab.labName} />
      ))}
    </>
  );
};

export default UsersPage;
