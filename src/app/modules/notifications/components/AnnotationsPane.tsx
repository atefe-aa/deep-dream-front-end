import clsx from "clsx";
import { defaultLogs } from "../../../../_metronic/helpers";

function AnnotationsPane() {
  return (
    <div className="tab-pane fade" id="annotations" role="tabpanel">
      <div className="scroll-y mh-150px my-5 px-8">
        {defaultLogs.map((log, index) => (
          <div key={`log${index}`} className="d-flex flex-stack py-4">
            <div className="d-flex align-items-center me-2">
              <span
                className={clsx(
                  "w-70px badge",
                  `badge-light-${log.state}`,
                  "me-4"
                )}
              >
                {log.code}
              </span>

              <a href="#" className="text-gray-800 text-hover-primary fw-bold">
                {log.message}
              </a>

              <span className="badge badge-light fs-8">{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { AnnotationsPane };
