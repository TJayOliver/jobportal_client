import { FaShareFromSquare } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { useState } from "react";
import { CountryCode } from "./countryFlag";

const CardElement = ({
  image,
  descriptionOrOverview,
  companyOrScholarshipName,
  postionOrScholarshipName,
  countryOrLocation,
  salaryOrDeadline,
  scholarshiptypeOrDateCreated,
  cediOrClock,
  clockOrTrophy,
  link,
  country,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const countryCode = CountryCode(country);

  const flag = countryCode
    ? `https://countryflagsapi.netlify.app/flag/${countryCode}.svg`
    : image;
  return (
    <div className="bg-[#0F141E] border-slate-600 h-60 max-w-screen-xl relative rounded-md shadow-lg border motion-translate-y-in-100">
      {/* image,location,title,share */}
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-1">
          <div className="flex gap-1">
            {!flag && (
              <div className=" h-9 w-9 shrink-0 bg-[#2d2e32] flex items-center justify-center rounded-full">
                {companyOrScholarshipName.substring(0, 2)}
              </div>
            )}
            {flag && (
              <div className="h-9 w-9 rounded-full shrink-0 flex bg-[#2d2e32]">
                <img
                  src={flag}
                  alt={companyOrScholarshipName.substring(0, 2)}
                  onError={(e) => {
                    e.target.style.display = "none"; // Hide broken image
                  }}
                  className="h-full w-full bg-cover rounded-full"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm text-white inline md:hidden">
              {postionOrScholarshipName.substring(0, 50)}..
            </h1>
            <h1 className="text-sm hidden md:inline text-white">
              {postionOrScholarshipName.substring(0, 20)}..
            </h1>
            <small className="text-[12px] text-white">
              {countryOrLocation}
            </small>
          </div>
        </div>
        {/* share */}
        <FaShareFromSquare />
      </div>
      {/* short descriptionOrOverview */}
      <div className="px-4">
        <span className="text-sm inline md:hidden lg:hidden">
          {descriptionOrOverview.substring(0, 15)}..
        </span>
        <span className="text-sm hidden md:inline lg:hidden">
          {descriptionOrOverview.substring(0, 10)}..
        </span>
        <span className="text-sm hidden md:hidden lg:inline">
          {descriptionOrOverview.substring(0, 30)}..
        </span>
        <hr className="mt-2"></hr>
      </div>
      {/* salary,date posted */}
      <div className="flex items-center justify-between p-4">
        <div className="text-[12px] flex items-center">
          {cediOrClock}
          <p>{salaryOrDeadline}</p>
        </div>
        <div className="flex items-center text-[12px] gap-1">
          {clockOrTrophy} {scholarshiptypeOrDateCreated}
        </div>
      </div>
      {/* buttons */}
      <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 gap-1 flex justify-between items-center">
        <a
          href={link}
          className=" cursor-pointer bg-gradient-to-r flex justify-center h-10 items-center from-[#641B2E] to-[#3a111c] w-full p-2 text-slate-200 rounded-xl hover:motion-preset-fade hover:motion-duration-2000"
        >
          <p className="duration-100 ease-in">Apply</p>
        </a>
        <div
          onClick={toggleLike}
          className="rounded-lg h-10 w-12 border border-slate-300 flex items-center justify-center cursor-pointer"
        >
          {isLiked ? (
            <IoHeart size={20} className="motion-preset-confetti" />
          ) : (
            <IoMdHeartEmpty size={20} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardElement;
