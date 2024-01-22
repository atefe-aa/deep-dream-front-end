import { AddNewSlide } from "../../modules/settings/slides/components/AddNewSlide";
import { AddNewTestPrice } from "../../modules/settings/test-type-price-setting/components/AddNewTestPrice";
import { AddNewTestType } from "../../modules/settings/test-type-settings/components/AddNewTestType";
import MachineSettings from "../../modules/settings/machine-settings/components/MachineSettings";
import TestTypesSettings from "../../modules/settings/test-type-settings/components/TestTypesSettings";
import { LABS_TESTS_DATA } from "../../utils/constants";

function SettingsPage() {
  return (
    <>
      <MachineSettings />
      <TestTypesSettings />

      {/* begin:: Modals */}
      <AddNewTestType />

      <AddNewSlide />
      {/* end:: Modals */}
    </>
  );
}

export default SettingsPage;
