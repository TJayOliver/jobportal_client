import { TailSpin } from "react-loader-spinner";

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

export default Loading;
