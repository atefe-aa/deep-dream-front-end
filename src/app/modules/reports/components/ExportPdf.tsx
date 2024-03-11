import { KTIcon } from "../../../../_metronic/helpers";

type Props = {
  ref: string;
};

const ExportPdf: React.FC<Props> = ({ ref }) => {
  return (
    <button className="btn btn-info">
      <KTIcon iconName="exit-up" className="fs-2" />
      Export PDF
    </button>
  );
};
export { ExportPdf };
