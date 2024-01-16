import { FC } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { title } from "process";
import { DropDownButton } from "../../dropdown/DropDownButton";

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
        <td key={coor.id}>
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
          <DropDownButton>
            <div className="menu-item px-3">
              <a href="#" className="menu-link px-3">
                <KTIcon iconName="pencil" className="fs-3 me-3" />
                Edit Info
              </a>
            </div>
            <div className="menu-item px-3 my-1">
              <a
                href="#"
                className="menu-link px-3 text-danger "
                data-bs-toggle="tooltip"
                title="Delete Slide"
              >
                <KTIcon iconName="trash" className="fs-3 me-3" />
                Delete Slide
              </a>
            </div>
          </DropDownButton>
        </div>
      </td>
    </tr>
  );
};

export { SlidesPlacementTableRow };
