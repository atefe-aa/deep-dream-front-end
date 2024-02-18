import { useEffect, useState } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { useNotifications } from "../hooks/useNotifications";
import { NotificationModel } from "../_models";
import clsx from "clsx";
import { Spinner } from "react-bootstrap";
import { useMarkAsRead } from "../hooks/useMarkAsRead";

function SystemPane() {
  const { isPending, getNotifications, notifications } = useNotifications(
    `page=${2}`
  );
  const { markAsRead } = useMarkAsRead();

  useEffect(() => {
    getNotifications("system");
  }, [ getNotifications]);

  useEffect(() => {
    // Assuming notifications have an 'id' property
    const notificationIds = notifications.map((notification:NotificationModel) => notification.id);
    if (notificationIds.length > 0) {
      markAsRead(notificationIds);
    }
  }, [notifications, markAsRead]);

  return (
    <div className="tab-pane fade show active" id="systems" role="tabpanel">
      <div className="scroll-y mh-150px my-5 px-8">
        {isPending && <Spinner animation="border" />}
        {!isPending &&
          notifications.map((noti: NotificationModel, index: number) => (
            <div key={`alert${index}`} className="d-flex flex-stack py-4">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-35px me-4">
                  <span
                    className={clsx(
                      "symbol-label",
                      `bg-light-${noti.data.state}`
                    )}
                  >
                    <KTIcon
                      iconName="message-text"
                      className={`fs-2 text-${noti.data.state}`}
                    />
                  </span>
                </div>

                <div className="mb-0 me-2">
                  <a
                    href="#"
                    className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                  >
                    {noti.data.title}
                  </a>
                  <div className="text-gray-500 fs-7">
                    {noti.data.description}
                  </div>
                </div>
              </div>

              <span className="badge badge-light fs-8">{noti.time}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export { SystemPane };
