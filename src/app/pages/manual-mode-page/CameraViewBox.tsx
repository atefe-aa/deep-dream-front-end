type Props = {
    targetComponentRef: React.MutableRefObject<null>;
};

const CameraViewBox: React.FC<Props> = ({ targetComponentRef }) => {
  return (
    <div className="col-lg-8 col-lx-9 p-0 h-100"   ref={targetComponentRef}>
      <div className="card d-flex h-100 align-items-center justify-content-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            className="w-100px"
            src="media\img\camera-off.png"
            alt="Camera Off"
          />
          <span className="fs-2 text-muted">Camera is off.</span>
        </div>
      </div>
    </div>
  );
};

export default CameraViewBox;
