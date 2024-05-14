import careerImage from "../../../assets/career.jpg";
import scholarshipImage from "../../../assets/sch.jpg";
import jobImage from "../../../assets/job.jpg";

const Offer = () => {
  return (
    <div className="bg-white md:h-[28rem] p-2 flex flex-col gap-3">
      <div className=" flex flex-col ">
        <p className=" text-3xl font-bold justify-center flex">What We Offer</p>
      </div>

      <div className="flex flex-col md:flex md:flex-row items-center gap-4 relative justify-center">
        {/* Career Guidance */}
        <div className="w-72 flex flex-col gap-2">
          <div className="h-52 w-[22rem]rounded-lg">
            <img
              src={careerImage}
              loading="lazy"
              className="rounded-lg object-cover h-full w-full duration-75 ease-in"
              alt="scholarships"
            />
          </div>

          <div className=" flex items-center gap-2">
            {/* circle */}
            <div className=" relative">
              <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-500 to-teal-500"></div>

              <p className="absolute -bottom-1.5 text-6xl font-bold text-white left-5">
                1
              </p>
            </div>

            <div className="h-20 w-0.5 bg-gray-400"></div>

            <div>
              <p className=" text-xl font-medium">Career Guidance</p>
              <p>
                help individuals acquire information, skills<br></br> and
                experience necessary to identify<br></br>career options.
              </p>
            </div>
          </div>
        </div>

        {/* Scholarships */}
        <div className="w-72 flex flex-col gap-2">
          <div className="h-52 w-[22rem]rounded-lg ">
            <img
              src={scholarshipImage}
              loading="lazy"
              className="rounded-lg object-cover h-full w-full"
              alt="scholarships"
            />
          </div>

          <div className=" flex items-center gap-2">
            {/* circle */}
            <div className=" relative">
              <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-500 to-teal-500"></div>

              <p className="absolute -bottom-1.5 text-6xl font-bold text-white left-5">
                2
              </p>
            </div>

            <div className="h-20 w-0.5 bg-gray-400"></div>

            <div>
              <p className=" text-xl font-medium">Scholarships</p>
              <p>
                By promoting scholarship opportunities all<br></br>year long,we
                provide direction and help to <br></br>students in need of
                financial aid.
              </p>
            </div>
          </div>
        </div>

        {/* Jobs */}
        <div className=" w-72 flex flex-col gap-2">
          <div className="h-52 w-[22rem]rounded-lg ">
            <img
              src={jobImage}
              loading="lazy"
              className="rounded-lg object-cover h-full w-full"
              alt="jobs"
            />
          </div>

          <div className=" flex items-center gap-2">
            {/* circle */}
            <div className=" relative">
              <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-500 to-teal-500"></div>

              <p className="absolute -bottom-1.5 text-6xl font-bold text-white left-5">
                3
              </p>
            </div>

            <div className="h-20 w-0.5 bg-gray-400"></div>

            <div>
              <p className=" text-xl font-medium">Jobs</p>
              <p>
                To locate your next career use our job search<br></br>
                move,engine to browse millions of job listings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
