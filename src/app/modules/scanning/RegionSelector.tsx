import {
  AreaSelector,
  IArea,
  IAreaRendererProps,
} from "@bmunozg/react-image-area";
import { FC, useState } from "react";

type Props = {
  image: string;
};
const RegionSelector: React.FC<Props> = ({ image }) => {
  const [areas, setAreas] = useState<IArea[]>([]);

  const onChangeHandler = (areas: IArea[]) => {
    setAreas(areas);
  };

  console.log(areas);

  return (
    <AreaSelector
      areas={areas}
      maxAreas={1}
      unit="percentage"
      onChange={onChangeHandler}
    >
      <img
        style={{ width: "100%", height: "100%" }}
        src="/media/slides/slide.jpg"
        alt="my image"
      />
    </AreaSelector>
  );
};
export { RegionSelector };
