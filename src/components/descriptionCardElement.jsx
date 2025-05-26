import { FaShareFromSquare } from "react-icons/fa6";
const DescriptionCardElement = ({
  image,
  descriptionOrOverview,
  postionOrScholarshipName,
  countryOrLocation,
  salaryOrDeadline,
  scholarshiptypeOrDateCreated,
  cediOrClock,
  clockOrTrophy,
  link,
}) => {
  return (
    <a
      href={link}
      className="bg-[#0F141E] cursor-pointer border-slate-600 h-44 max-w-screen-xl relative rounded-md shadow-lg border"
    >
      {/* image,location,title,share */}
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-1">
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="h-9 w-9 rounded-full shrink-0 flex bg-[#2d2e32] bg-cover"
          ></div>
          <div className="flex flex-col">
            <h1 className="text-sm dark:text-white">
              {postionOrScholarshipName}
            </h1>
            <p className="text-sm dark:text-white">{countryOrLocation}</p>
          </div>
        </div>
        {/* share */}
        <FaShareFromSquare />
      </div>
      {/* short description */}
      <div className="px-4">
        <p className=" text-[12px]">
          {descriptionOrOverview.substring(0, 20)}..
        </p>
        <hr className="mt-2"></hr>
      </div>
      {/* salary,date posted */}
      <div className="flex items-center justify-between p-4">
        <div className="text-[12px] flex items-center">
          {cediOrClock} <p>{salaryOrDeadline}</p>
        </div>
        <div className="flex items-center text-[12px] gap-1">
          {clockOrTrophy} {scholarshiptypeOrDateCreated}
        </div>
      </div>
    </a>
  );
};

export default DescriptionCardElement;
