import { AddNewSlide } from "../../modules/settings/slides/components/AddNewSlide";
import { AddNewTestType } from "../../modules/settings/test-type-settings/components/AddNewTestType";
import MachineSettings from "../../modules/settings/machine-settings/components/MachineSettings";
import TestTypesSettings from "../../modules/settings/test-type-settings/components/TestTypesSettings";


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
