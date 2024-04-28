import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <TailSpin
      visible={true}
      height="60"
      width="60"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
    />
  );
};

export default Loading;
