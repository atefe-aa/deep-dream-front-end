import { Spinner } from "react-bootstrap";
import { useAuth } from "../../modules/auth";
import { useGetToken } from "../../modules/auth/hooks/useGetToken";
import { useLocation } from "react-router-dom";
import { hasRole } from "../../utils/helper";
interface TokenResponse {
  token: string;
}
const ImagePage = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  let username = queryParams.get("username");
  const project = queryParams.get("project") || "";
  const image = queryParams.get("image") || "";
  let url = `http://magic.deepdream.ir/#/project/${project}/image/${image}?username=`;

  const { currentUser } = useAuth();
  if (currentUser) {
    if (hasRole(currentUser, ["superAdmin", "operator"]))
      username = import.meta.env.VITE_CYTOMINE_ADMINE_USERNAME;
    else username = currentUser.data.username;
  }

  url += username + "&token=";

  const { data, isLoading } = useGetToken(username || "");

  if (!isLoading && data) url += data.data.token;

  console.log(url);

  return (
    <>
      {username && isLoading && <Spinner animation="grow" />}
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
