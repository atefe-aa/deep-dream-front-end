import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_APP_API_URL_;

const BASE_URL = `${API_URL}/loginCytomine`;
async function loginCytomine() {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    // Handle the error appropriately in your application
  }
}
function CytomineButton(){

  const [url, setUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await loginCytomine();
      console.log(data);
      if (data && data.username && data.token) {
        setUrl(
          `http://magic.deepdream.ir/#/project/161/image/15163/slice/15164?viewer=iwlcse9ee&username=${data.username}&token=${data.token}`
        );
      }
    }

    fetchData();
  }, []);

    return    <Button>
    <a href={url}>view image</a>
  </Button>
}

export {CytomineButton}