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
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`headding${name}`}>
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${name}`}
          aria-expanded="true"
          aria-controls={`collapse${name}`}
        >
         {label}
        </button>
      </h2>
      <div
        id={`collapse${name}`}
        className={`accordion-collapse collapse ${show && 'show'}`}
        aria-labelledby={`hedding${name}`}
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <div className="card-body border-top p-9">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingItem;
