import { BsCalendar2CheckFill, BsPinMapFill } from "react-icons/bs";
import one from "../../assets/eight.jpg";
import { BiCategory } from "react-icons/bi";

const JobDescriptionBox = ({
  image,
  description,
  location,
  company,
  duration,
  position,
  category,
  salary,
  to,
}) => {
  return (
    <div
      role="button"
      className=" bg-white drop-shadow-md w-full h-62 md:w-[22rem] rounded-md shrink-0"
    >
      <div className=" flex flex-col p-2 gap-3 shrink-0 grow-0 justify-between">
        <div className=" flex justify-between">
          <div className=" flex gap-3">
            {/* Company Logo and Location */}
            <div className=" rounded-full h-12 w-12 border-[1px] bg-white drop-shadow-sm flex shrink-0">
              <img
                src={one}
                className="h-full w-full object-cover rounded-full"
              />
            </div>

            {/* Company Name and Location */}
            <div>
              <p className=" font-bold">{position}</p>
              <small>{description}...</small>
            </div>
          </div>
        </div>

        <p className="font-medium">{company}</p>

        {/* category and duration */}
        <div className=" flex flex-col justify-start gap-1 flex-wrap text-sm font-medium">
          <div className=" flex gap-1 bg-gray-50 rounded-md px-2 py-1 w-full">
            <BiCategory className=" mt-1" />
            <p>{category}</p>
          </div>

          <div className=" flex gap-1 bg-gray-50 rounded-md w-full px-2 py-1">
            <BsCalendar2CheckFill className="mt-1" />
            <p>{duration}</p>
          </div>

          <div className=" flex gap-1 bg-gray-50 whitespace-nowrap rounded-md  px-2 py-1">
            <BsPinMapFill className="mt-1" />
            <p>{location}</p>
          </div>
        </div>

        <button href={to} className="bg-red-500 text-white p-2 rounded-sm">
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobDescriptionBox;
