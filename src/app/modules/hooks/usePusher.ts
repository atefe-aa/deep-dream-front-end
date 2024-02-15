import { useEffect, useState } from "react";
import { ScanModel } from "../scanning/core/_models";
import { echoInstance } from "../../utils/echoInstance";

export const usePusher = (channelName: string, eventName: string) => {
  const [scan, setScan] = useState<ScanModel>();

  useEffect(() => {
    const channel = echoInstance.channel(channelName);
    channel.listen(`.${eventName}`, (e: ScanModel) => {
      setScan(e);
    });

    // Cleanup
    return () => {
      channel.stopListening(`.${eventName}`);
      echoInstance.leave(channelName);
    };
  }, [channelName, eventName]);

  return { scan };
};
