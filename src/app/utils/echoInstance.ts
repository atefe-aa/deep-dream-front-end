// echoInstance.js
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { getAuthToken } from "./requestHelpers";


export const echoInstance = new Echo({
  broadcaster: "pusher",
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStatus: true,
  enabledTransports: ["ws", "wss"], // Depending on your setup, you might want to support both
  auth: {
    headers: {
      Authorization: getAuthToken(),
    },
  },
});
