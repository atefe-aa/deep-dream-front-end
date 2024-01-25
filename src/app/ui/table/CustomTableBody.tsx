import { FC } from "react";

type Props = {
  children: React.ReactNode;

  accordionId?: string;
};

const CustomTableBody: FC<Props> = ({
  children,

  accordionId,
}) => {
  return (
    <tbody
      className={accordionId ? "accordion" : ""}
      id={accordionId || undefined}
    >
      {children}
    </tbody>
  );
};

export { CustomTableBody };
