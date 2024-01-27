import { LABS_TESTS_DATA, counsellorsData } from "../../utils/constants";
import { AddNewLaboratory } from "../../modules/user-management/laboratories/components/modals/AddNewLaboratory";
import { AddNewCounsellor } from "../../modules/user-management/counsellors/components/AddNewCounsellor";
import { AddNewTestPrice } from "../../modules/user-management/laboratories/test-type-price-setting/components/AddNewTestPrice";
import { Laboratories } from "../../modules/user-management/laboratories/components/Laboratories";

const UsersPage = () => {
  return (
    <>
      <Laboratories />

      {/* <div className="mt-10">
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
        </CustomTable> */}

      {/* <Pagination totalItems={laboratories?.length()} itemsPerPage={} currentPage={} onPageChange={} /> */}
      {/* </div> */}

      {/* begin:: Modals */}
      <AddNewLaboratory />
      <AddNewCounsellor />
      {LABS_TESTS_DATA.map((lab) => (
        <AddNewTestPrice key={lab.id} labName={lab.labName} />
      ))}
      {/* end:: Modals */}
    </>
  );
};

export default UsersPage;
