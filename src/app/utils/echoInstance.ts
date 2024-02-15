// echoInstance.js
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { getAuthToken } from "./requestHelpers";


export const echoInstance = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  wsHost: '127.0.0.1',
  wsPort: 6001,
  wssPort: 6001,
  forceTLS: false,
  disableStatus: true,
  enabledTransports: ["ws"],
  authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT,
  auth: {
    headers: {
      Authorization: getAuthToken(),
    },
  },
});