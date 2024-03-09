import { AreaSelector, IArea } from "@bmunozg/react-image-area";
import { useState } from "react";
import { AreaModel, ScanModel } from "../core/_models";

type Props = {
  image: string;
  scan: ScanModel;
  handleSetAreas: (scanId: number, regions: AreaModel[]) => void;
};
const RegionSelector: React.FC<Props> = ({ image, scan, handleSetAreas }) => {

const slideCoordinats = scan.coordinates;
const slide = {
  height:slideCoordinats.ne.x -slideCoordinats.sw.x,
  width:slideCoordinats.ne.y -slideCoordinats.sw.y
}

  const [areas, setAreas] = useState<IArea[]>([]);

  const getCoordinates = (area: IArea) => {
    return {
      sw: {
        x: (area.x * slide.width) / 100,
        y: (area.y * slide.height) / 100,
      },
      ne: {
        x: (area.x * slide.width) / 100 + (area.width * slide.width) / 100,
        y: (area.y * slide.height) / 100 + (area.height * slide.height) / 100,
      },
    };
  };
  const jjj = {
    sw: { x: "$this->sw_x", y: "$this->sw_y" },
    ne: { x: "$this->ne_x", y: "$this->ne_y" },
  };
  const onChangeHandler = (areas: IArea[]) => {
    setAreas(areas);
    const convertedAreas = areas.map((area) => getCoordinates(area));
    handleSetAreas(scan.id, convertedAreas);
  };

  const handleReset = () => {
    setAreas([]);
  };

  return (
    <>
      <div className="region-selector-hover-scale">
        {areas.length > 0 &&
          areas.map((area) => {
            const coordinates = getCoordinates(area);
            return (
              <div key={area.x + area.y} className=" d-flex">
                <div className="me-3">
                  NW x:{" "}
                  <span className="text-muted">
                    {Math.round(coordinates.sw.x)}
                  </span>
                </div>
                <div className="me-3">
                  NW y:{" "}
                  <span className="text-muted">
                    {Math.round(coordinates.sw.y)}
                  </span>
                </div>{" "}
                <div className="me-3">
                  SE x:{" "}
                  <span className="text-muted">
                    {Math.round(coordinates.ne.x)}
                  </span>
                </div>
                <div className="me-3">
                  SE y:{" "}
                  <span className="text-muted">
                    {Math.round(coordinates.ne.y)}
                  </span>
                </div>
              </div>
            );
          })}
        <AreaSelector
          areas={areas}
          unit="percentage"
          onChange={onChangeHandler}
          globalAreaStyle={{
            border: "1px dashed blue",
            opacity: "0.8",
          }}
        >
          <img
            style={{
              width: `${slide.width}mm`,
              height: `${slide.height}mm`,
              borderRadius: "5px",
            }}
            src={image}
            alt="slide image"
          />
        </AreaSelector>
      </div>

      <button
        className="btn btn-danger btn-active-color-primary mt-1 btn-sm"
        onClick={handleReset}
      >
        <span>Clear</span>
      </button>
    </>
  );
};
export { RegionSelector };
