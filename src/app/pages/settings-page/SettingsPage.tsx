import { AddNewTestType } from "../../modules/settings/AddNewTestType";
import MachineSettings from "../../modules/settings/machine-settings/MachineSettings";
import TestTypesSettings from "../../modules/settings/test-type-settings/TestTypesSettings";


function Settings() {
  return (
    <>
      <MachineSettings />
      <TestTypesSettings />


        {/* begin:: Modals */}
        <AddNewTestType />
      {/* end:: Modals */}
    </>
  );
}

export default Settings;
