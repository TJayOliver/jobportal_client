import { useEffect, useState } from "react";
import { fetch } from "../../../pages/request";
import FeaturedBox from "../../Jobs/FeaturedBox";
import Loading from "../../Loading/Loading";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import axios from "axios";

const FeaturedJobs = () => {
  const [trackRightClick, setRightTrackClick] = useState(0);
  const [trackLeftClick, setLeftTrackClick] = useState(0);

  const [featuredjobs, setJobsFeatured] = useState([]);
  const [scholarshipFeatured, setScholarshipFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  const [displayJob, setDisplayJob] = useState(true);
  const [displayScholarship, setDisplayScholarship] = useState(false);

  const leftArrow = () => {
    setDisplayJob(true);
    setDisplayScholarship(false);
    setLeftTrackClick(1);
    setRightTrackClick(0);
  };
  const rightArrow = () => {
    setDisplayJob(false);
    setDisplayScholarship(true);
    setRightTrackClick(1);
    setLeftTrackClick(0);
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("scholarship/featured", setScholarshipFeatured, setLoading, signal, setDisplayJob);
    fetch("job/featured", setJobsFeatured, setLoading, signal);
    return () => controller.abort();
  }, []);

  return (
    <section className=" flex justify-center gap-4 p-2 h-[34rem]">
      {/* Latest Jobs and scholarships */}
      <div className="bg-[#FEFAF6] h-[27rem] w-[58rem] rounded-2xl p-2 relative overflow-hidden">
        {/* Heading */}
        <div className="flex justify-between">
          <p className=" font-bold text-xl text-black ">
            {displayJob ? "Latest Job" : "Latest Scholarships"}
          </p>

          {/* buttons */}
          <div className="flex items-center gap-2">
            <div
              onClick={leftArrow}
              role="button"
              className={
                trackLeftClick === 1
                  ? "hidden"
                  : "rounded-full h-6 w-6 border-[1px] border-black hover:border-white hover:bg-gradient-to-tr hover:from-blue-500 hover:to-teal-500 group flex items-center justify-center"
              }
            >
              <HiArrowLeft className="text-black group-hover:text-white  duration-100 ease-in" />
            </div>
            <div
              onClick={rightArrow}
              role="button"
              className={
                trackRightClick === 1
                  ? "hidden"
                  : "rounded-full h-6 w-6 border-[1px] border-black hover:border-white hover:bg-gradient-to-tr hover:from-blue-500 hover:to-teal-500 group flex items-center justify-center"
              }
            >
              <HiArrowRight className="text-black group-hover:text-white  duration-100 ease-in" />
            </div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div id="featured">
            <div
              id="job"
              className={
                displayJob
                  ? "grid grid-cols-2 md:grid-cols-4 gap-y-24 gap-14 p-2 absolute duration-300 ease-in"
                  : "grid grid-cols-2 md:grid-cols-4 gap-y-24 gap-14 p-2 absolute duration-300 ease-in translate-x-[58rem]"
              }
            >
              {!featuredjobs ? (
                <Loading />
              ) : (
                featuredjobs.map((job, id) => (
                  <FeaturedBox
                    key={id}
                    image={job.image}
                    location={job.location}
                    company={job.company}
                    duration={job.duration}
                    position={job.position}
                    category={job.categoryname}
                    salary={job.salary}
                    to={`/job/${job.id}`}
                  />
                ))
              )}
            </div>

            <div
              id="scholarship"
              className={
                displayScholarship
                  ? "grid grid-cols-2 md:grid-cols-4 gap-y-24 gap-14 p-2 absolute duration-300 ease-in translate-x-0"
                  : "grid grid-cols-2 md:grid-cols-4 gap-y-24 gap-14 p-2 absolute duration-300 ease-in -translate-x-[58rem]"
              }
            >
              {scholarshipFeatured.map((scholarship, id) => (
                <FeaturedBox
                  key={id}
                  image={scholarship.image}
                  location={scholarship.scholarshiptype}
                  company={scholarship.scholarshipname.slice(0, 20)}
                  category={scholarship.scholarshiptype}
                  to={`/scholarship/${scholarship.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedJobs;
