import { TailSpin, RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="grid place-content-center">
      <TailSpin
        visible={true}
        height="30"
        width="60"
        color="#fff"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
};

export const LoadingAdmin = () => {
  return (
    <div className="grid place-content-center">
      <RotatingLines
        visible={true}
        height="66"
        width="66"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
