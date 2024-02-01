import { LABS_TESTS_DATA, counsellorsData } from "../../utils/constants";
import { AddNewLaboratory } from "../../modules/user-management/laboratories/components/modals/AddNewLaboratory";
import { AddNewCounsellor } from "../../modules/user-management/counsellors/components/AddNewCounsellor";
import { AddNewTestPrice } from "../../modules/user-management/laboratories/test-type-price-setting/components/AddNewTestPrice";
import { Laboratories } from "../../modules/user-management/laboratories/components/Laboratories";
import { hasRole } from "../../utils/helper";
import { Counsellors } from "../../modules/user-management/counsellors/components/Counsellors";
import { useAuth } from "../../modules/auth";

const UsersPage = () => {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser && hasRole(currentUser, "superAdmin") && (
        <>
          <Laboratories />
          <AddNewLaboratory />
        </>
      )}

      <Counsellors />
      {/* begin:: Modals */}
      <AddNewCounsellor />
      {/* end:: Modals */}
    </>
  );
};

export default UsersPage;
