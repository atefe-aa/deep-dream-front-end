import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../../auth";

function ReportSignature() {
  const { currentUser } = useAuth();
  return (
    <div style={{ position: "fixed", bottom: 90,right:0 , marginRight:"100px"}}>
      <img
        style={{ height: "100px", width: "100px" }}
        src={
          currentUser?.data.signature ||
          toAbsoluteUrl("/media/img/signature.png")
        }
        alt="Signature"
      />
    </div>
  );
}
export { ReportSignature };
