import { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { title } from "process";

interface CoordinatesArray {
  id: number;
  title: string;
  value: number;
}

interface DataArray {
  id: number;
  title: string;
  coordinates: CoordinatesArray[];
}

type Props = {
  data: DataArray;
  index: number;
};

const SlidesPlacementTableRow: FC<Props> = ({ data, index }) => {
  return (
    <tr>
      <td>
        <div className="form-check form-check-sm form-check-custom form-check-solid">
          {index}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <div className="d-flex justify-content-start flex-column">
            <a
              href="#"
              className="text-gray-900 fw-bold text-hover-primary fs-6"
            >
              {data.title}
            </a>
          </div>
        </div>
      </td>
      {data.coordinates.map((coor) => (
        <td>
          <a
            href="#"
            className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
          >
            {coor.value}
          </a>
        </td>
      ))}
      <td>
        <div className="d-flex justify-content-end flex-shrink-0">
          <a
            href="#"
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
          >
            <KTIcon iconName="pencil" className="fs-3" />
          </a>
          <a
            href="#"
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
          >
            <KTIcon iconName="trash" className="fs-3" />
          </a>
        </div>
      </td>
    </tr>
  );
};

export { SlidesPlacementTableRow };
