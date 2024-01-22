import { CustomTable } from "../../ui/table/CustomTable";
import { LABS_TESTS_DATA, counsellorsData } from "../../utils/constants";
import { AddNewLaboratory } from "../../modules/user-management/laboratories/components/AddNewLaboratory";
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

const UsersPage = () => {
  const { isLoading: isLoadingLaboratories, laboratories } = useLaboratories();

  return (
    <>
      <UsersListSearchComponent />
      {isLoadingLaboratories && <ListLoading />}
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
            <LaboratoryTableRow key={lab.id} labData={lab} index={index + 1} />
          ))}
      </CustomTable>

      <Pagination />

      <div className="mt-10">
        <UsersListSearchComponent />
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

        <Pagination />
      </div>

      {/* modal */}
      <AddNewLaboratory />
      <AddNewCounsellor />
      {LABS_TESTS_DATA.map((lab) => (
        <AddNewTestPrice key={lab.id} labName={lab.labName} />
      ))}
    </>
  );
};

export default UsersPage;
