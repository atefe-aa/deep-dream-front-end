import { FC, useState } from "react";
import { toAbsoluteUrl } from "../../_metronic/helpers";
import { Tab, Tabs } from "react-bootstrap";
import { counsellorsData } from "../utils/constants";

type Props = {
  backgrounUrl: string;
};

const ShareMenu: FC<Props> = ({ backgrounUrl }) => {
  const [counsellors, setCounsellors] = useState<number[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(counsellors);
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
    console.log(counsellors);
  }
  const [key, setKey] = useState("share");
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
          <div className="d-flex flex-column px-9">
            <div className="pt-10 pb-0">
              <h3 className="text-gray-900 text-center fw-bolder">
                Select Counsellors
              </h3>

              <div className="text-center text-gray-600 fw-bold pt-1">
                Select a counsellor to send a link to this test.
              </div>
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header " id="headingOne">
                    <button
                      className="accordion-button h-30px collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Counsellors List
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse h-150px scroll-y"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {counsellorsData.map((coun) => (
                        <div
                          className="d-flex"
                          key={coun.id}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="form-check form-check-custom form-check-solid">
                            <label className="form-label fw-bolder text-gray-800 fs-6">
                              <input
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
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-5 mb-9" onClick={handleSubmit}>
                <button className="btn btn-sm btn-primary px-6" type="submit">
                  Send
                </button>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey="history" title="History">
          Tab content for history
        </Tab>
      </Tabs>
    </div>
  );
};

export { ShareMenu };
