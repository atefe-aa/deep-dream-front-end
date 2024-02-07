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

    const channel = window.Echo.channel(channelName);
    channel.listen(`.${eventName}`, (data: any) => {
      if (onEvent) onEvent(data);
    });

    // Cleanup
    return () => {
      window.Echo.leaveChannel(channelName);
    };
  }, [channelName, eventName, onEvent]);
};
