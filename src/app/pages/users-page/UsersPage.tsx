import { CustomTable } from "../../ui/CustomTable";
import { LaboratoryTableRow } from "../../ui/table/labratories/LaboratoryTableRow";
import { LABS_TESTS_DATA, counsellorsData } from "../../utils/constants";
import { AddNewLaboratory } from "./AddNewLaboratory";
import { UsersListSearchComponent } from "../../modules/apps/user-management/users-list/components/header/UsersListSearchComponent";
import { Pagination } from "../../ui/Pagination";
import { CounsellorTableRow } from "../../ui/table/counsellors/CounsellorTableRow";
import { AddNewCounsellor } from "./AddNewCounsellor";

const UsersPage = () => {
  return (
    <>
      <UsersListSearchComponent />
      <CustomTable
        className=""
        columns={["Name", "username", "Phone", "Address", "Description"]}
        modalId="kt_modal_add_new_laboratory"
      >
        {LABS_TESTS_DATA.map((lab, index) => (
          <LaboratoryTableRow key={lab.id} labData={lab} index={index + 1} />
        ))}
      </CustomTable>

      <Pagination />

      <div className="mt-10">
        <UsersListSearchComponent />
        <CustomTable
          tableTitle="Counsellors List"
          className=""
          columns={["Name", "Phone"]}
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
    </>
  );
};

export default UsersPage;
