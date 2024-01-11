import { useState } from "react";
import SettingItem from "./SettingItem";
import { DEFAULT_SETTINGS, Slides_Placements } from "../../../utils/constants";
import SettingFormGroup from "./SettingFormGroup";
import Checkbox from "./Checkbox";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TestTypesTable } from "../../../ui/table/test-types/TestTypesTable";
import { TestTypesTableRow } from "../../../ui/table/test-types/TestTypesTableRow";
import { SlidesPlacementTableRow } from "../../../ui/table/test-types/SlidesPlacementTableRow";

const addSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Title is required"),
  code: Yup.number().required("Test code is required."),
  type: Yup.string().required("Type is required"),
  sex: Yup.string().required("Gender is required"),
  discription: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(300, "Maximum 300 symbols"),
});

const initialValues = {
  title: "",
  code: "",
  type: "",
  sex: "",
  description: "",
  mag4x: true,
  mag10x: false,
  mag40x: false,
  mag100x: false,
};

function MachineSettings() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        console.log(values);
        // const {data: auth} = await login(values.email, values.password)
        // saveAuth(auth)
        // const {data: user} = await getUserByToken(auth.api_token)
        // setCurrentUser(user)
      } catch (error) {
        console.error(error);
        // saveAuth(undefined)
        setStatus("The login details are incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <div className="card mb-5 mb-xl-10">
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#machine_settings"
        aria-expanded="true"
        aria-controls="machine_settings"
      >
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Machine Settings</h3>
        </div>
      </div>

      <div id="machine_settings" className="collapse show">
        <div className="accordion px-10" id="accordionExample">
          <form
            //  onSubmit={formik.handleSubmit}
            noValidate
            className="form"
          >
            {DEFAULT_SETTINGS.map(
              (set, _index) =>
                set.title !== "slides placement" && (
                  <SettingItem
                    key={set.id}
                    label={`Settings for ${set.title}`}
                    name={set.title}
                    show={_index === 0}
                  >
                    {set.settings.map((setting) =>
                      setting.type === "checkbox" ? (
                        <Checkbox
                          formik={formik}
                          key={setting.id}
                          isChecked={!!setting.value}
                          label={setting.title.toUpperCase()}
                          inputName={setting.title}
                        />
                      ) : (
                        <SettingFormGroup
                          value={setting.value}
                          key={setting.id}
                          label={setting.title.toUpperCase()}
                          type={setting.type}
                          placeHolder={`${setting.type.toUpperCase()} setting`}
                          inputName={setting.title}
                        />
                      )
                    )}
                  </SettingItem>
                )
            )}
            <SettingItem name="slide_placement" label="Slide Placement" show={true}>
              <TestTypesTable
              modalId="kt_modal_add_new_slide"
                className="mb-5 mb-xl-8"
                columns={["Number", "x", "y"]}
              >
                {Slides_Placements.map((slide, index) => (
                  <SlidesPlacementTableRow
                    key={slide.id}
                    index={index}
                    data={slide}
                  />
                ))}
              </TestTypesTable>
            </SettingItem>

            <div className="card-footer d-flex justify-content-end py-6 px-9">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {!loading && "Save Changes"}
                {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...{" "}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MachineSettings;
