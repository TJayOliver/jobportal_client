import { BiSearch } from "react-icons/bi";

const GraduateButtons = ({ text }) => {
  return (
    <button className=" bg-white rounded-full w-26 h-14 p-0.5 md:p-4 whitespace-nowrap text-md text-center group overflow-hidden group hover:bg-red-600 duration-100 ease-out hover:text-white">
      <div className=" relative flex px-1">
        <div className=" flex gap-1 absolute -translate-y-14 group-hover:translate-y-0 duration-300 ease-out">
          Search
          <BiSearch className=" text-xl mt-1" />
        </div>
        <p className=" group-hover:translate-y-14 duration-150 ease-in-out">
          {text}
        </p>
      </div>
    </button>
  );
};

export default GraduateButtons;
