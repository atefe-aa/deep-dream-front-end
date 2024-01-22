import { CustomTable } from "../../ui/table/CustomTable";
import { LABS_TESTS_DATA, counsellorsData } from "../../utils/constants";
import { AddNewLaboratory } from "../../modules/user-management/laboratories/components/AddNewLaboratory";
import { Pagination } from "../../ui/Pagination";
import { AddNewCounsellor } from "../../modules/user-management/counsellors/components/AddNewCounsellor";
import { AddNewTestPrice } from "../../modules/settings/test-type-price-setting/components/AddNewTestPrice";
import { UsersListSearchComponent } from "../../modules/user-management/laboratories/components/header/UsersListSearchComponent";
import { LaboratoryTableRow } from "../../modules/user-management/laboratories/components/LaboratoryTableRow";
import { CounsellorTableRow } from "../../modules/user-management/counsellors/components/CounsellorTableRow";

const UsersPage = () => {
  return (
    <>
      <UsersListSearchComponent />
      <CustomTable
        className=""
        accordionId="labsPanel"
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
