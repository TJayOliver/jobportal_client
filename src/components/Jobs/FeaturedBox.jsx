import { Link } from "react-router-dom";
import parser from "html-react-parser";
import { BASE_URL } from "../../pages/request";

const FeaturedBox = ({
  image,
  description,
  location,
  company,
  position,
  to,
}) => {
  return (
    <div className=" h-24 shrink-0 text-md p-1">
      <div className=" flex flex-col p-2 shrink-0 grow-0 justify-between gap-2">
        <div className=" flex justify-between h-[3.5rem] mb-2 ">
          {/* Company Logo and Location */}
          <div className=" flex gap-1">
            <div className=" rounded-full h-12 w-12 border-[1px] bg-white drop-shadow-sm flex shrink-0">
              <img
                src={`${BASE_URL}/upload/${image}`}
                loading="lazy"
                className="h-full w-full object-cover rounded-full"
              />
            </div>

            <div>
              <p className=" font-bold text-md line-clamp-4">{company}..</p>
            </div>
          </div>
        </div>

        {/* Job Title and Description */}
        <p className=" font-medium ">{position}</p>

        {/* Apply Button */}
        <div
          role="button"
          className="rounded-full mt-1 bg-gradient-to-tr from-blue-500 to-teal-500 hover:duration-150 hover:ease-out text-white font-bold h-8 flex items-center justify-center w-24 px-2"
        >
          <Link to={to}>Apply</Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBox;
