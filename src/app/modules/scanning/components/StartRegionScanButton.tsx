import { SelectedRegion } from "../../../pages/scanning/ScanningPage";
import { useStartRegionScanning } from "../hooks/useStartRegionScanning";
interface Props {
  selectedRegions: SelectedRegion[];
}

const StartRegionScanButton: React.FC<Props> = ({ selectedRegions }) => {
  const { isStarting, startRegionScanning } = useStartRegionScanning();

  const start = () => {
    startRegionScanning(selectedRegions);
  };

  return (
    <button
    type="button"
      className="btn btn-success ms-4 me-4"
      disabled={isStarting}
      onClick={start}
    >
      Start Region Scanning
    </button>
  );
};

export default StartRegionScanButton;
