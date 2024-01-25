import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const CustomTableHead: FC<Props> = ({ children }) => {
  return (
    <thead>
      <tr className="fw-bold text-muted">
        <th className="w-25px">
          <div className="form-check form-check-sm form-check-custom form-check-solid">
            #
          </div>
        </th>
        {children}
        <th className="min-w-100px text-center">Actions</th>
      </tr>
    </thead>
  );
};

export { CustomTableHead };
