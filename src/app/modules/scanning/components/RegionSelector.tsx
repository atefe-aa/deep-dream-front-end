import { AreaSelector, IArea } from "@bmunozg/react-image-area";
import { useState } from "react";

const slide = {
  width: 75,
  height: 25,
};

type Props = {
  image: string;
};
const RegionSelector: React.FC<Props> = ({ image }) => {
  const [areas, setAreas] = useState<IArea[]>([]);

  const getCoordinates = (area: IArea) => {
    return {
      start: {
        x: (area.x * slide.width) / 100,
        y: (area.y * slide.height) / 100,
      },
      end: {
        x: (area.x * slide.width) / 100 + (area.width * slide.width) / 100,
        y: (area.y * slide.height) / 100 + (area.height * slide.height) / 100,
      },
    };
  };
  const onChangeHandler = (areas: IArea[]) => {
    setAreas(areas);
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
              <div className=" d-flex">
                <div className="me-3">
                  NW x:{" "}
                  <span className="text-muted">
                    {Math.round(coordinates.start.x)}
                  </span>
                </div>
                <div className="me-3">
                  NW y:{" "}
                  <span className="text-muted">
                    {Math.round(coordinates.start.y)}
                  </span>
                </div>{" "}
                <div className="me-3">
                  SE x:{" "}
                  <span className="text-muted">
                    {Math.round(coordinates.end.x)}
                  </span>
                </div>
                <div className="me-3">
                  SE y:{" "}
                  <span className="text-muted">
                    {Math.round(coordinates.end.y)}
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
