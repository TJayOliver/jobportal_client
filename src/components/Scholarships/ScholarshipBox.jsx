/* eslint-disable react/prop-types */
import parser from "html-react-parser";
import { BASE_URL } from "../../pages/request";

const ScholarshipBox = ({
  image,
  scholarshiptype,
  agent,
  date,
  location,
  description,
  scholarshipname,
  to,
}) => {
  return (
    <a
      href={to}
      className="w-full bg-white hover:drop-shadow-sm hover:border-[#004242] border-[1px] md:h-40 rounded-lg p-4 flex flex-col justify-between"
    >
      {/* Heading */}
      <div className="flex justify-between">
        <div className="flex gap-3">
          <img
            src={`${BASE_URL}/upload/${image}`}
            className="h-10 w-10 object-cover rounded-sm bg-gray-100"
          ></img>
          <div>
            <p className="font-bold ">{scholarshipname}</p>
            <div className="flex gap-3 whitespace-nowrap">
              <p>{scholarshiptype}</p>
              <p className="hidden md:block">{agent}</p>
            </div>
          </div>
        </div>

        <div className="whitespace-nowrap">
          <p className="font-medium">{location}</p>
          <p>{date}</p>
        </div>
      </div>

      {/* description scholarships */}
      <div>
        <p>{parser(`${description}`)}</p>
      </div>
    </a>
  );
};

export default ScholarshipBox;
