import { FiAlertTriangle } from "react-icons/fi";
import { FaCheckDouble } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { useState, useEffect } from "react";

const ConfirmDelete = ({ id, route, title }) => {
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4040/${route}/delete/${id}`
      );
      setDone(true);
      setMessage(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error.message);
    }
  };

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
      {/* Delete Box */}
      <div
        className={`bg-white drop-shadow-md h-96 md:h-64 md:w-[35rem] rounded-md flex flex-col items-center justify-center p-4 gap-4 relative duration-300 ease-in `}
      >
        {/* Close Button */}
        <div
          onClick={handleDisplay}
          className="  h-[2rem] w-8 bg-gray-200 rounded-full items-center flex justify-center text-center absolute right-2 top-2 p-2 cursor-pointer "
        >
          <CgClose className="absolute -right-0.5 top-0 p-2 text-4xl text-center text-gray-600 cursor-pointer" />
        </div>

        {done ? (
          <div className="items-center justify-center flex flex-col gap-2">
            {/* success */}
            <div className=" h-14 md:h-[4rem] w-14 bg-gray-100 rounded-full items-center flex justify-center text-center">
              <FaCheckDouble className="text-4xl text-blue-700 text-bold" />
            </div>

            <p className=" font-bold text-xl">{message}</p>

            <button
              onClick={handleDisplay}
              className="  h-10 p-2 rounded-md w-full bg-blue-600 hover:text-white hover:border-none hover:duration-300 hover:ease-in"
            >
              DONE
            </button>
          </div>
        ) : (
          <div className="items-center justify-center flex flex-col gap-2">
            {/* Caution */}
            <div className=" h-14 md:h-[4rem] w-14 bg-gray-100 rounded-full items-center flex justify-center text-center">
              <FiAlertTriangle className="text-4xl text-red-700 text-bold" />
            </div>

            <p className=" font-bold text-xl">Delete {title}?</p>

            <p className=" text-center">
              Are you sure you want to delete this {title}? It will be
              permanently deleted from the servers forever. This action cannot
              be undone.
            </p>

            {/* buttons */}
            <div className=" w-full flex flex-col md:flex md:flex-row gap-2">
              <button
                onClick={handleDisplay}
                className=" border border-black h-10 p-2 rounded-md w-full hover:bg-blue-600 hover:text-white hover:border-none hover:duration-300 hover:ease-in"
              >
                CANCEL
              </button>

              <button
                onClick={() => handleDelete()}
                className=" border border-black h-10 p-2 rounded-md w-full hover:bg-red-600 hover:text-white hover:border-none hover:duration-300 hover:ease-in"
              >
                DELETE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmDelete;
