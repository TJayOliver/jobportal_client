import { FiCheckSquare } from "react-icons/fi";

const SubmittedBox = ({ successMessage }) => {
  return (
    <div className=" sticky top-0 translate-x-2/4 z-50 ">
      <div className="bg-white h-32 w-[30rem] rounded-md flex justify-center drop-shadow-md -translate-x-2/4 left-2/4 duration-75 ease-in">
        <div className=" flex m-auto justify-between gap-2 p-2 md:p-0 items-center">
          <FiCheckSquare className=" text-blue-600 font-bold text-6xl md:text-5xl" />
          <h1 className="text-2xl font-bold">{successMessage}</h1>
        </div>
      </div>
    </div>
  );
};

export default SubmittedBox;
