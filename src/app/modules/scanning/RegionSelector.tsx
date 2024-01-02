import {
  AreaSelector,
  IArea,
  IAreaRendererProps,
} from "@bmunozg/react-image-area";
import { FC, useState } from "react";

const RegionSelector: FC = () => {
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
      <img style={{width:"120px",rotate:"-90deg",height:"350px"}} src="/media/slides/slide.jpg" alt="my image" />
    </AreaSelector>
  );
};
export { RegionSelector };
