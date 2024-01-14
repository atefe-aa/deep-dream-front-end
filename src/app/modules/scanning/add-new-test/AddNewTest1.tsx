import React, { FC, ReactNode } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik, FormikConfig, useFormik } from "formik";
import QRCodeGenerator from "./QRCodeGenerator";
import { LABS_TESTS_DATA, TEST_TYPES } from "../../../utils/constants";
import Select from "react-select";
import { ModalLayout } from "../../../ui/modals/ModalLayout";

const addSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  nationalId: Yup.number()
    .min(1000000000, "The national ID format is wrong.")
    .max(9999999999, "The national ID format is wrong."),
  age: Yup.number().min(1, "Minimum age is 1 ").required("Age is required"),
  ageType: Yup.string().required("Age type is required"),
  sex: Yup.string().required("Gender is required"),
  testType: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(7, "Maximum 7 symbols")
    .required("Test Type is required"),
  laboratory: Yup.string()
    .min(1, "Minimum 3 symbols")
    .max(20, "Maximum 20 symbols")
    .required("Laboratory title is required"),
  discription: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(300, "Maximum 300 symbols"),
  labNumber: Yup.string()
    .min(1, "Minimum 1 symbols")
    .max(10, "Maximum 300 symbols"),
});

const initialValues = {
  name: "",
  nationalId: "",
  age: "",
  ageType: "year",
  sex: "",
  testType: 0,
  laboratory: "",
  description: "",
  labNumber: "",
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

const AddNewTest1: FC = () => {
  const sortedLabsData = [...LABS_TESTS_DATA].sort((a, b) =>
    a.labName.localeCompare(b.labName)
  );

  const sortedTestTypes = [...TEST_TYPES].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const testTypeOptions = TEST_TYPES.map((test) => ({
    value: test.id,
    label: `${test.code} - ${test.title}`,
  }));

  const formik = useFormik({
    initialValues:initialValues,
    validationSchema:addSchema,
    
   onSubmit: async (values, { setStatus, setSubmitting }) => {
  
      try {
        console.log(values);
      } catch (error) {
        console.error(error);
        // saveAuth(undefined)
        setStatus("The login details are incorrect");
        setSubmitting(false);
      }
    },
  })
  return (
    <ModalLayout modalId="kt_modal_add_new_test">
      <div className="text-center mb-13">
        <h1 className="mb-3">Add New Test</h1>
      </div>

  
        <form  onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <label htmlFor="nationalId">National ID</label>
          <Field name="nationalId" type="text" />
          <ErrorMessage name="nationalId" />

          <label htmlFor="age">Age</label>
          <Field name="age" type="number" />
          <ErrorMessage name="age" />

          <button type="submit">Submit</button>
        </form>

    </ModalLayout>
  );
};

export { AddNewTest1 };

// Create empty context
// const FormikContext = React.createContext({});

// // Place all of what’s returned by useFormik into context
// export const Formik = ({
//   children,
//   ...props
// }: FormikConfig<any> & { children: ReactNode }) => {
//   const formikStateAndHelpers = useFormik(props);
//   return (
//     <FormikContext.Provider value={formikStateAndHelpers}>
//       {typeof children === "function"
//         ? children(formikStateAndHelpers)
//         : children}
//     </FormikContext.Provider>
//   );
// };
