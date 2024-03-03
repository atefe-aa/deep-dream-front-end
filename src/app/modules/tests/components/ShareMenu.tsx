import { FC, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { defaultAlerts } from "../../../utils/constants";
import clsx from "clsx";
import { useCounsellors } from "../../user-management/counsellors/hooks/useCounsellors";
import { CounsellorModel } from "../../user-management/counsellors/core/_models";
import { useShare } from "../hooks/useShare";

type Props = {
  backgrounUrl: string;
  testId: number;
};

const ShareMenu: FC<Props> = ({ backgrounUrl, testId }) => {
  const [counsellors, setCounsellors] = useState<number[]>([]);
  const { isSharing, share } = useShare();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (counsellors.length === 0) return;
    share({ testId, counsellors });
  }

  function HandleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;

    setCounsellors((prevCounsellors) => {
      if (checked) {
        return [...prevCounsellors, Number(name)];
      } else {
        return prevCounsellors.filter((item) => item !== Number(name));
      }
    });
  }
  const [key, setKey] = useState("share");

  const { isLoading, counsellors: counsellorsList } =
    useCounsellors("noPaginate=true");
  return (
    <div
      className="d-flex flex-column bgi-no-repeat rounded-top"
      style={{
        backgroundImage: `url('${toAbsoluteUrl(backgrounUrl)}')`,
        backgroundSize: "100% 106px ",
      }}
    >
      <div>
        <h3 className="text-white fw-bold px-9 mt-10 mb-6">
          Share with your colleagues
        </h3>
      </div>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k || "share")}
        className="mb-3"
      >
        <Tab eventKey="share" title="Share">
          <div className="d-flex flex-column px-9 scroll-y h-100">
            <div className="pt-10 pb-0">
              <h3 className="text-gray-900 text-center fw-bolder">
                Select Counsellors
              </h3>

              <div className="text-center text-gray-600 fw-bold pt-1">
                Select a counsellor to send a link to this test.
              </div>
              <div className="accordion" id={`accordion_${testId}`}>
                <div className="accordion-item">
                  <h2 className="accordion-header " id={`heading_${testId}`}>
                    <button
                      className="accordion-button h-30px collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse_${testId}`}
                      aria-expanded="true"
                      aria-controls={`collapse_${testId}`}
                    >
                      Counsellors List
                    </button>
                  </h2>
                  <div
                    id={`collapse_${testId}`}
                    className="accordion-collapse collapse h-150px scroll-y"
                    aria-labelledby={`heading_${testId}`}
                    data-bs-parent={`#accordion_${testId}`}
                  >
                    <div className="accordion-body">
                      {isLoading ? (
                        <Spinner animation="grow" />
                      ) : (
                        counsellorsList.map((coun: CounsellorModel) => (
                          <div
                            className="d-flex"
                            key={coun.id}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="form-check form-check-custom form-check-solid">
                              <label className="form-label fw-bolder text-gray-800 fs-6">
                                <input
                                  disabled={isSharing}
                                  className="form-check-input me-3"
                                  type="checkbox"
                                  checked={counsellors.includes(coun.id)}
                                  onChange={HandleOnChange}
                                  name={coun.id.toString()}
                                />
                                {coun.name}
                              </label>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="text-center menu-item mt-5 mb-9 menu-link"
                onClick={handleSubmit}
              >
                <button
                  disabled={isSharing}
                  className="btn menu-link btn-sm btn-primary px-6"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="history" title="History">
          <div className="scroll-y  my-5 px-8 mh-200px">
            {defaultAlerts.map((alert, index) => (
              <div key={`alert${index}`} className="d-flex flex-stack py-4">
                <div className="d-flex align-items-center">
                  <div className="symbol symbol-35px me-4">
                    <span
                      className={clsx(
                        "symbol-label",
                        `bg-light-${alert.state}`
                      )}
                    >
                      <KTIcon
                        iconName={alert.icon}
                        className={`fs-2 text-${alert.state}`}
                      />
                    </span>
                  </div>

                  <div className="mb-0 me-2">
                    <div className="fs-6 text-gray-800 text-hover-primary fw-bolder">
                      {alert.name}
                    </div>
                    <div className="text-gray-500 fs-7">
                      {alert.description}
                    </div>
                  </div>
                </div>

                <span className="badge badge-light fs-8">{alert.time}</span>
              </div>
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export { ShareMenu };
