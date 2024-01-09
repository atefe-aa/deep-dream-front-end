type Props = {
  children: React.ReactNode;
};

const Magnifications: React.FC<Props> = ({ children }) => {
  return (
    <div className="d-lg-flex align-items-center mb-5">
      <label className="form-label me-10 ">Required Magnifications:</label>
      <div className="d-flex">{children}</div>
    </div>
  );
};

export default Magnifications;
