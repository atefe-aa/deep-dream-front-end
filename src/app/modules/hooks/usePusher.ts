import { useEffect, useState } from "react";
import {  ScanModel } from "../scanning/core/_models";
import { getAuthToken } from "../../utils/requestHelpers";
import Echo from "laravel-echo";
import PusherType from "pusher-js/types/src/core/pusher";
import Pusher from "pusher-js";
declare global {
  interface Window {
    Echo: Echo;
    Pusher: typeof PusherType;
  }
}

export const usePusher = (channelName: string, eventName: string) => {
  window.Pusher = Pusher;

window.Echo = new Echo({
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

  const [scan, setScan] = useState<ScanModel>();
  useEffect(() => {
    window.Echo.channel(channelName).listen(`.${eventName}`, (e: ScanModel) => {
      setScan(e);
    });
    // Cleanup
    return () => {
      window.Echo.leaveChannel(channelName);
    };
  }, [channelName, eventName]);


  return { scan };
};
