import { AreaSelector, IArea } from "@bmunozg/react-image-area";
import { useState } from "react";

type Props = {
  image: string;
};
const RegionSelector: React.FC<Props> = ({ image }) => {
  const [areas, setAreas] = useState<IArea[]>([]);

  const onChangeHandler = (areas: IArea[]) => {
    setAreas(areas);
  };

  const handleReset = () => {
    setAreas([]);
  };

  const handleRightClick = () => {
    // Prevent the default context menu from showing up
    console.error("Right-clicked!");
    // Add your custom logic here
  };
  return (
    <>
      <AreaSelector
        areas={areas}
        unit="percentage"
        onChange={onChangeHandler}
        globalAreaStyle={{
          border: "2px dashed blue",
          opacity: "0.5",
        }}
      >
        <img
          onContextMenu={handleRightClick}
          style={{ width: "100%", height: "100%", borderRadius: "5px" }}
          src={image}
          alt="slide image"
        />
      </AreaSelector>
      <button
        className="btn btn-danger btn-active-color-primary mt-1 btn-sm"
        onClick={handleReset}
      >
        <span>Cleare All</span>
      </button>
    </>
  );
};
export { RegionSelector };
