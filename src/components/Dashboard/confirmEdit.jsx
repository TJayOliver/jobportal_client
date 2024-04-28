import { FiAlertTriangle } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { useState, useEffect } from "react";

const ConfirmEdit = ({ id, title, checker, route }) => {
  const boxClass =
    "fixed w-full h-full bg-[#f65a5a33] z-50 grid place-content-center p-2";
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setDisplay(true);
  }, [id]);

  const handleDisplay = () => {
    setDisplay(false);
  };

  return (
    <div className={display ? boxClass : "hidden"}>
      {/* edit Box */}
      <div
        className={`bg-white drop-shadow-md h-96 md:h-64 md:w-[35rem] rounded-md flex flex-col items-center justify-center p-4 gap-4 relative duration-300 ease-in z-50`}
      >
        {/* Close Button */}
        <div
          onClick={handleDisplay}
          className="  h-[2rem] w-8 bg-gray-200 rounded-full items-center flex justify-center text-center absolute right-2 top-2 p-2 cursor-pointer "
        >
          <CgClose className="absolute -right-0.5 top-0 p-2 text-4xl text-center text-gray-600 cursor-pointer" />
        </div>

        {/* Caution */}
        <div className=" h-14 md:h-[20rem] w-14 bg-gray-100 rounded-full items-center flex justify-center text-center">
          <FiAlertTriangle className="text-4xl text-red-700 text-bold" />
        </div>

        <p className=" font-bold text-xl">Edit {title}?</p>

        <p className=" text-center">
          Are you sure you want to edit this {title}? Changes will be made to
          the already existing saved data.
        </p>

        {/* buttons */}
        <div className=" w-full flex flex-col md:flex md:flex-row gap-2">
          <button
            onClick={handleDisplay}
            className=" border border-black h-10 p-2 rounded-md w-full hover:bg-cyan-600 hover:text-white hover:border-none hover:duration-300 hover:ease-in"
          >
            CANCEL
          </button>

          <button
            onClick={() => checker(route)}
            className=" border border-black h-10 p-2 rounded-md w-full hover:bg-teal-600 hover:text-white hover:border-none hover:duration-300 hover:ease-in text-center"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEdit;
