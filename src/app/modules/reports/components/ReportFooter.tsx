import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../../auth";

function ReportFooter() {
  const { currentUser } = useAuth();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        width: "99%",
      }}
    >
      <img
        style={{ height: "50px", width: "99%" }}
        src={currentUser?.data.footer || toAbsoluteUrl("/media/img/footer.jpg")}
      />
    </div>
  );
}
export { ReportFooter };
