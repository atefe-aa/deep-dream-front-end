type Props = {
  label: string;
  name: string;
  children: React.ReactNode;
  show: boolean;
};

const SettingItem: React.FC<Props> = ({
  children,
  label,
  name,
  show = false,
}) => {
  const modifiedName = name.replace(/ /g, "_");

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`headding${modifiedName}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${modifiedName}`}
          aria-expanded="true"
          aria-controls={`collapse${modifiedName}`}
        >
          {label}
        </button>
      </h2>
      <div
        id={`collapse${modifiedName}`}
        className={`accordion-collapse collapse ${show && "show"}`}
        aria-labelledby={`hedding${modifiedName}`}
        // data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <div className="card-body border-top p-9">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingItem;
