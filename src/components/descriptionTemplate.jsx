import moment from "moment";

const DescriptionTemplate = ({
  image,
  imageAlt,
  location,
  category,
  companyNameOrScholarshipTitle,
  jobOrScholarhipTitle,
  jobDurationOrScholarshipType,
  datecreated,
  post,
  link,
}) => {
  return (
    <div>
      {/* heading */}
      <div className="h-28 p-4 rounded-t-2xl">
        <div className="flex gap-2">
          {!image && (
            <div className=" h-20 w-20 bg-[#0F141E] border-slate-600 border ">
              {imageAlt}
            </div>
          )}
          {image && (
            <div className=" h-20 w-20 bg-[#0F141E] border-slate-600 border ">
              <img
                src={image}
                alt={imageAlt}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col">
            <h1 className="text-xl font-bold dark:text-white">
              {companyNameOrScholarshipTitle}
            </h1>
            <small className="mb-2">{location}</small>
            <small className=" bg-[#0F141E] rounded-lg w-auto px-1 ">
              {category}
            </small>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className=" p-4 rounded-t-2xl flex flex-col gap-4 ">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">
              {jobOrScholarhipTitle}
            </h1>
            <small>{jobDurationOrScholarshipType}</small>
          </div>
          <div className="hidden md:flex flex-col">
            <small>Posted On: {moment(datecreated).format("DD-MM-YYYY")}</small>
          </div>
        </div>
        <div
          className="text-justify text-white/95"
          dangerouslySetInnerHTML={{ __html: post }}
        ></div>
      </div>
      <a href={link}>
        <button className="bg-[#0F141E] hover:bg-[#121722] cursor-pointer p-2 w-full rounded-lg text-center">
          Apply
        </button>
      </a>
    </div>
  );
};

export default DescriptionTemplate;
