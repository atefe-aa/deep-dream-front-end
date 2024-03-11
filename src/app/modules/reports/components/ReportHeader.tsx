import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../../auth";

function ReportHeader() {
  const { currentUser } = useAuth();
  return (
    <div >
      <img
      style={{height:"70px",width:"100%"}}
        src={
          currentUser?.data.header || toAbsoluteUrl("/media/img/header.webp")
        }
      />
    </div>
  );
}
export { ReportHeader };
