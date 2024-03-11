import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../../auth";

function ReportFooter() {
  const { currentUser } = useAuth();
  return (
    <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <img
      style={{ height: "70px", width: "100%" }}
        src={currentUser?.data.footer || toAbsoluteUrl("/media/img/footer.jpg")}
      />
    </div>
  );
}
export { ReportFooter };
