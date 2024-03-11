import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../../auth";

function ReportHeader() {
  const { currentUser } = useAuth();
  return (
    <div style={{margin:'0 10px 0 10px'}}>
      <img
      style={{height:"50px",width:"100%"}}
        src={
        //   currentUser?.data.header || toAbsoluteUrl("/media/img/header.webp")
          currentUser?.data.header || toAbsoluteUrl("/media/img/header.png")
        }
      />
    </div>
  );
}
export { ReportHeader };
