import { useEffect, useState } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { useNotifications } from "../hooks/useNotifications";
import { NotificationModel } from "../_models";
import clsx from "clsx";
import { Spinner } from "react-bootstrap";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import { useGetNotifications } from "../hooks/useGetNotifications";

function SystemPane() {
  const {
    isPending,
    notifications: notifs,
    getNotifs,
    meta
  } = useGetNotifications("system");
  const { markAsRead } = useMarkAsRead();
  const [items, setItems] = useState<NotificationModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getNotifs(`page=${currentPage}`); // This fetches notifications
  }, [currentPage, getNotifs]); // Depends on currentPage and getNotifs only

  useEffect(() => {
    if (!isPending && notifs.length) {
      setItems((prevItems) => {
        // Create a map of existing item IDs for quick lookup
        const existingIds = new Set(prevItems.map((item) => item.id));

        // Filter out notifications that are already in the items
        const newNotifs = notifs.filter(
          (notif: NotificationModel) => !existingIds.has(notif.id)
        );

        // Merge new notifications with existing items
        return [...prevItems, ...newNotifs];
      });
    }
  }, [isPending, notifs]); 
  useEffect(() => {
    return () => {
      const notifIds = items.map(noti => noti.id);
      markAsRead(notifIds);
    };
  }, [items]);

  function handleLoadMore() {
    if (!isPending && meta.total === items.length) return;
    if (!isPending && meta.total > items.length)
      setCurrentPage((prevPage) => prevPage + 1);
  }
  return (
    <div className="tab-pane fade show active" id="systems" role="tabpanel">
      <div className="scroll-y mh-150px my-5 px-8">
        {isPending && <Spinner animation="border" />}
        {!isPending &&
          !isPending &&
          items.length > 0 &&
          items.map((noti: NotificationModel, index: number) => (
            <div key={`alert${index}`} className="d-flex flex-stack py-4">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-35px me-4">
                  <span
                    className={clsx(
                      "symbol-label",
                      `bg-light-${noti.data?.state}`
                    )}
                  >
                    <KTIcon
                      iconName="message-text"
                      className={`fs-2 text-${noti.data?.state}`}
                    />
                  </span>
                </div>

                <div className="mb-0 me-2" data-id={noti.id}>
                  <div
                    
                    className="fs-6 text-gray-800 text-hover-primary fw-bolder"
                  >
                    {noti.data?.title}
                  </div>
                  <div className="text-gray-500 fs-7">
                    {noti.data?.description}
                  </div>
                </div>
              </div>

              <span className="badge badge-light fs-8">{noti?.time}</span>
            </div>
          ))}
        {!isPending && meta.total > items.length && (
          <div className="d-flex justify-content-center">
            <div
              
              className="text-gray-900 fw-bold text-hover-primary fs-6"
              onClick={handleLoadMore}
              aria-disabled={isPending || isPending}
            >
              Load More
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { SystemPane };
