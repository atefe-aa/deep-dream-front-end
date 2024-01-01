import React from "react";
import { SlidesTable } from "./SlidesTable";

type Props = {
  start: Function;
};

const ScanningLabels: React.FC<Props> = ({ start }) => {
  return (
    <div className=" w-100">
      <SlidesTable className="" />
    </div>
  );
};

export { ScanningLabels };
