import React, { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
interface ScanUpdatedEvent {
    status: string;
    currentRegion: number;
    totalRegions: number;
    imageUrl?: string;
  }
const ScanStatus =  ({ scanId }: { scanId: number }) => {
  const [status, setStatus] = useState('');
  const [currentRegion, setCurrentRegion] = useState(0);
  const [totalRegions, setTotalRegions] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Assuming window.Echo is already configured in your bootstrap file
    const channel = window.Echo.private(`scan.${scanId}`);
    
    channel.listen('.RegionScanned',(e: ScanUpdatedEvent) =>  {
      setStatus(e.status);
      setCurrentRegion(e.currentRegion);
      setTotalRegions(e.totalRegions);
      if (e.imageUrl) {
        setImageUrl(e.imageUrl);
      }
    });

    // Cleanup subscription on component unmount
    return () => {
      channel.stopListening('.ScanUpdated');
    };
  }, [scanId]);

  return (
    <div>
      <p>Status: {status}</p>
      <p>Region: {currentRegion} out of {totalRegions}</p>
      {imageUrl && <img src={imageUrl} alt="Scan Result" />}
    </div>
  );
};

export default ScanStatus;
