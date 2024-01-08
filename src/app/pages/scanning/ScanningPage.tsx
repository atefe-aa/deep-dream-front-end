import { useEffect, useState } from "react";
import { SlidesTable } from "../../modules/scanning/SlidesTable";
import { SlideRow } from "../../modules/scanning/SlideRow";
import * as Yup from "yup";
import { useFormik } from "formik";
import Timer from "../../modules/scanning/Timer";

const fakeData = [
  {
    image: "",
    slide: 1,
    laboratory: "",
    testNumber: 0,
    testType: "",
    progress: "",
  },
  {
    image: "/media/slides/slide.jpg",
    slide: 2,
    laboratory: "Milad",
    testNumber: 550036,
    testType: "CC",
    progress: "scanned",
  },
  {
    image: "/media/slides/slide.jpg",
    slide: 3,
    laboratory: "Milad",
    testNumber: 550037,
    testType: "CC",
    progress: "scanned",
  },
  {
    image: "/media/slides/slide.jpg",
    slide: 4,
    laboratory: "Milad",
    testNumber: 550038,
    testType: "CC",
    progress: "ready",
  },
  {
    image: "/media/slides/slide.jpg",
    slide: 5,
    laboratory: "Milad",
    testNumber: 550039,
    testType: "CC",
    progress: "scanned",
  },
  {
    image: "/media/slides/slide.jpg",
    slide: 6,
    laboratory: "Milad",
    testNumber: 550040,
    testType: "CC",
    progress: "failed",
  },
  {
    image: "/media/slides/slide.jpg",
    slide: 7,
    laboratory: "Milad",
    testNumber: 550041,
    testType: "CC",
    progress: "ready",
  },
  {
    image: "/media/slides/slide.jpg",
    slide: 8,
    laboratory: "Milad",
    testNumber: 550042,
    testType: "CC",
    progress: "ready",
  },
  {
    image: "/media/slides/slide.jpg",
    slide: 9,
    laboratory: "Milad",
    testNumber: 550043,
    testType: "CC",
    progress: "ready",
  },
  {
    image: "/media/slides/slide.jpg",
    slide: 10,
    laboratory: "Milad",
    testNumber: 0,
    testType: "CC",
    progress: "ready",
  },
];
interface FormValues {
  selectedCheckboxes: number[];
  selectAll: boolean;
  testNumber: number;
}
const initialValues: FormValues = {
  selectedCheckboxes: [],
  selectAll: false,
  testNumber: 0,
};
const addSchema = Yup.object().shape({
  selectedCheckboxes: Yup.array()
    .min(1, "Select at least one slide!")
    .required("Select at least one slide!"),
});

const ScanningPage = () => {
  const [loading, setLoading] = useState(false);

  const checkboxes = Array.from({ length: 10 }, (_, index) => index + 1);
  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        console.log(values);
      } catch (error) {
        console.error(error);

        setStatus("The scanning details are incorrect");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("selectAll", e.target.checked);

    if (e.target.checked) {
      formik.setFieldValue("selectedCheckboxes", checkboxes);
    } else {
      formik.setFieldValue("selectedCheckboxes", []);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    let newSelectedCheckboxes = [...formik.values.selectedCheckboxes];

    if (checked) {
      newSelectedCheckboxes.push(+value);
    } else {
      newSelectedCheckboxes = newSelectedCheckboxes.filter(
        (checkbox) => checkbox !== +value
      );
    }

    formik.setFieldValue("selectedCheckboxes", newSelectedCheckboxes);

    // Update selectAll checkbox if all checkboxes are selected

    if (newSelectedCheckboxes.length === checkboxes.length) {
      formik.setFieldValue("selectAll", true);
    } else {
      formik.setFieldValue("selectAll", false);
    }
  };
  const [isScanning, setIsScanning] = useState(false);

  useEffect(
    function () {
      fakeData.map(
        (data) => data.progress === "scanning" && setIsScanning(true)
      );
    },
    [fakeData]
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row g-5 g-xl-8">
        {/* begin::Action */}
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {!loading && <span className="indicator-label">Scan labels</span>}
            {loading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
          <div className="text-end">
          <Timer />
        </div>
        </div>
        {/* end::Action */}
        {formik.touched.selectedCheckboxes &&
          formik.errors.selectedCheckboxes && (
            <div className="fv-plugins-message-container mb-4">
              <div className="fv-help-block">
                <span role="alert">*** {formik.errors.selectedCheckboxes}</span>
              </div>
            </div>
          )}

       

        <div className="col-xl-12">
          <div className="card-xl-stretch mb-xl-8">
            <SlidesTable
              handleSelectAllChange={handleSelectAllChange}
              formik={formik}
              className="card-xl-stretch mb-xl-8"
            >
              {fakeData.map((data, _index) => (
                <SlideRow
                  handleCheckboxChange={handleCheckboxChange}
                  formik={formik}
                  key={_index}
                  data={data}
                  isScanning={isScanning}
                />
              ))}
            </SlidesTable>
          </div>
        </div>
      </div>
    </form>
  );
};

export { ScanningPage };
