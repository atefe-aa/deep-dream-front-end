import { AddNewTestPrice } from "../../modules/settings/AddNewTestPrice";
import { AddNewTestType } from "../../modules/settings/AddNewTestType";
import MachineSettings from "../../modules/settings/machine-settings/MachineSettings";
import TestTypesSettings from "../../modules/settings/test-type-settings/TestTypesSettings";
import { LABS_TESTS_DATA } from "../../utils/constants";

function Settings() {
  return (
    <>
      <MachineSettings />
      <TestTypesSettings />

      {/* begin:: Modals */}
      <AddNewTestType />
      {LABS_TESTS_DATA.map((lab) => (
        <AddNewTestPrice
        labName={lab.labName}
        />
      ))}
      {/* end:: Modals */}
    </>
  );
}

export default Settings;
