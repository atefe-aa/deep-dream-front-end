import { Spinner } from "react-bootstrap";
import { useAuth } from "../../modules/auth";
import { useGetToken } from "../../modules/auth/hooks/useGetToken";
import { useLocation } from "react-router-dom";
import { hasRole } from "../../utils/helper";
import { LayoutSplashScreen } from "../../../_metronic/layout/core";
import { TopBarProgressComponent } from "../../ui/TopBarProgressComponent";
interface TokenResponse {
  token: string;
}
const ImagePage = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  let username = queryParams.get("username");
  const project = queryParams.get("project") || undefined;
  const image = queryParams.get("image") || undefined;
  const token = queryParams.get("token") || undefined;
  let url = `http://magic.deepdream.ir/#/project/${project}/image/${image}?username=`;

  const { currentUser } = useAuth();
  if (currentUser) {
    if (hasRole(currentUser, ["superAdmin", "operator"]))
      username = import.meta.env.VITE_CYTOMINE_ADMINE_USERNAME;
    else username = currentUser.data.username;
  }

  url += username + "&token=";

  const { data, isLoading } = useGetToken();

  if (!isLoading && data && data.data.token) url += data.data.token;
  if (!isLoading &&( !data || !data?.data?.token) && token) url += token;

  console.log(url);

  return (
    <>
      {username && isLoading && <TopBarProgressComponent />}
      {username && !isLoading && (
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <iframe
            src={url}
            width="100%"
            height="100%"
            style={{
              border: "none",
              position: "absolute",
              top: "-50px",
              // left: '-50px',
              width: "100%",
              height: "calc(100% + 50px)",
            }}
            title="Embedded Webpage"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default ImagePage;
