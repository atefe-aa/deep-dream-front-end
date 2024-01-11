import { FC, useState } from "react";
import { KTIcon, defaultAlerts, toAbsoluteUrl, useIllustrationsPath } from "../../_metronic/helpers";
import Select from "react-select";
import { useFormik } from "formik";

import * as Yup from "yup";
import { Link } from "react-router-dom";
import clsx from "clsx";

type Props = {
  backgrounUrl: string;
};

const addSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
});

const initialValues = {
  name: "",
};

const ShareMenu: FC<Props> = ({ backgrounUrl }) => {
  const [loading, setLoading] = useState(false);

  const options = [
    { value: 1, label: "Dr. Nasr" },
    { value: 2, label: "Dr. Ahmadi" },
    { value: 3, label: "Dr. Amini" },
    { value: 4, label: "Dr. Mohammadi" },
    { value: 5, label: "Dr. Ahmadi" },
  ];

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
    <div
      className="menu menu-sub menu-sub-dropdown menu-column w-350px w-lg-375px"
      data-kt-menu="true"
    >
      <div
        className="d-flex flex-column bgi-no-repeat rounded-top"
        style={{ backgroundImage: `url('${toAbsoluteUrl(backgrounUrl)}')` }}
      >
        <h3 className="text-white fw-bold px-9 mt-10 mb-6">
          Share with your colleagues
        </h3>

        <ul className='nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-bold px-9'>
        <li className='nav-item'>
          <a
            className='nav-link text-white opacity-75 opacity-state-100 pb-4 active'
            data-bs-toggle='tab'
            href='#kt_topbar_notifications_1'
          >
            Share
          </a>
        </li>

        <li className='nav-item'>
          <a
            className='nav-link text-white opacity-75 opacity-state-100 pb-4 '
            data-bs-toggle='tab'
            href='#kt_topbar_notifications_2'
          >
            History
          </a>
        </li>
      </ul>
      </div>

      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="kt_topbar_notifications_2"
          role="tabpanel"
        >
          <div className="d-flex flex-column px-9">
            <div className="pt-10 pb-0">
              <h3 className="text-gray-900 text-center fw-bolder">
                Select a colleage
              </h3>

              <div className="text-center text-gray-600 fw-bold pt-1">
                Select a colleage to send a link to this test.
              </div>
              <Select
                {...formik.getFieldProps("testType")}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 7,
                  colors: {
                    ...theme.colors,
                    primary25: "var(--bs-success-text-emphasis)",
                    neutral0: "var(--bs-modal-bg)",
                    neutral20: "var(--bs-gray-300)",
                    neutral80: "var(--bs-gray-700)",
                  },
                })}
                options={options}
                isSearchable={true}
                placeholder="Choose the test type"
                onChange={(option) =>
                  formik.setFieldValue("testType", option?.value)
                }
                value={options.find(
                  (option) => option.value === Number(formik.values.name)
                )}
              />

              <div className="text-center mt-5 mb-9">
                <a
                  href="#"
                  className="btn btn-sm btn-primary px-6"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_upgrade_plan"
                >
                  Send
                </a>
              </div>
            </div>

            <div className="text-center px-4">
              <img
                className="mw-100 mh-200px"
                alt="metronic"
                src={useIllustrationsPath("1.png")}
              />
            </div>
          </div>
        </div>
        <div className='tab-pane fade' id='kt_topbar_notifications_1' role='tabpanel'>
        <div className='scroll-y mh-325px my-5 px-8'>
          {defaultAlerts.map((alert, index) => (
            <div key={`alert${index}`} className='d-flex flex-stack py-4'>
              <div className='d-flex align-items-center'>
                <div className='symbol symbol-35px me-4'>
                  <span className={clsx('symbol-label', `bg-light-${alert.state}`)}>
                    {' '}
                    <KTIcon iconName={alert.icon} className={`fs-2 text-${alert.state}`} />
                  </span>
                </div>

                <div className='mb-0 me-2'>
                  <a href='#' className='fs-6 text-gray-800 text-hover-primary fw-bolder'>
                    {alert.title}
                  </a>
                  <div className='text-gray-500 fs-7'>{alert.description}</div>
                </div>
              </div>

              <span className='badge badge-light fs-8'>{alert.time}</span>
            </div>
          ))}
        </div>

        <div className='py-3 text-center border-top'>
          <Link
            to='/crafted/pages/profile'
            className='btn btn-color-gray-600 btn-active-color-primary'
          >
            View All <KTIcon iconName='arrow-right' className='fs-5' />
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export { ShareMenu };
