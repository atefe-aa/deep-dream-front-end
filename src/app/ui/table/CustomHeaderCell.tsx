import clsx from "clsx";
import { FC, useMemo } from "react";

type Props = {
  className?: string;
  title?: string;
  elementId: string;
  updateState: Function;
  state: any; // Consider defining a more specific type for state
};

const CustomHeaderCell: FC<Props> = ({
  className,
  title,
  elementId,
  updateState,
  state,
}) => {
  const id = elementId;

  const isSelectedForSorting = useMemo(() => {
    return state?.sort && state.sort === id;
  }, [state, id]);

  const order: "asc" | "desc" | undefined = useMemo(() => state?.order, [state]);

  const sortColumn = () => {
    // avoid sorting for these columns
    if (id === "actions" || id === "selection") {
      return;
    }

    if (!isSelectedForSorting) {
      // enable sort asc
      updateState(id, "asc");
      return;
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order === "asc") {
        // enable sort desc
        updateState(id, "desc");
        return;
      }

      // disable sort
      updateState(undefined, undefined);
    }
  };

  return (
    <th
      className={clsx(
        className,
        isSelectedForSorting && order !== undefined && `table-sort-${order}`
      )}
      style={{ cursor: "pointer" }}
      onClick={sortColumn}
    >
      {title}
    </th>
  );
};

export { CustomHeaderCell };
