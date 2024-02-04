import { useEffect } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { getAuthToken } from "../../utils/requestHelpers";

declare global {
  interface Window {
    Echo: Echo;
    Pusher: typeof Pusher;
  }
}
export const usePusher = (
  channelName: string,
  eventName: string,
  onEvent: (data: any) => void
) => {
  useEffect(() => {
    window.Pusher = Pusher;

    const echoInstance = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      encrypted: true,
      withCredentials: true,
      authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT,
      auth: {
        headers: {
          Authorization: getAuthToken(),
        },
      },
    });

    const channel = echoInstance.private(channelName);

    channel.listen(eventName, (data: any) => {
      if (onEvent) onEvent(data);
    });

    // Cleanup
    return () => {
      echoInstance.leaveChannel(channelName);
    };
  }, [channelName, eventName, onEvent]);
};
