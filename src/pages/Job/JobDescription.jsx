import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import image from "../../assets/built.jpg";
import international from "../../assets/international.jpg";
import Subscribe from "../../components/Subscribe/Subscribe";
import AdvertBox from "../../components/Advert/advertBox";
import DescriptionTemplate from "../../components/descriptionTemplate";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import { fetch, fetchByID } from "../request";
import DescriptionCardElement from "../../components/descriptionCardElement";
import { CountryCode } from "../../components/countryFlag";

const AdvertCard = ({ image }) => {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className=" rounded-xl h-96 bg-contain"
    ></div>
  );
};

const JobDescription = () => {
  axios.defaults.withCredentials = true;
  const params = useParams();
  const id = params.id;

  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [jobCategory, setJobCategory] = useState(null);
  const [relatedJobByCategory, setRelatedJobByCategory] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchByID("job/read", id, setJob, setLoading, setMessage, signal);
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (job.length) {
      job.map((job) => {
        setJobCategory(job.jobcategory);
      });
    }
    if (jobCategory !== null) {
      const controller = new AbortController();
      const signal = controller.signal;
      fetch(
        `job/category/${jobCategory}`,
        setRelatedJobByCategory,
        setLoading,
        signal,
        setMessage
      );
      return () => controller.abort();
    }
  }, [job]);

  const limitRelatedjob = relatedJobByCategory.slice(0, 5);

  const [subscribeState, setSubscribeState] = useState(false);
  const toggleSubscribe = () => {
    setSubscribeState((prev) => !prev);
  };
  return (
    <>
      <Subscribe
        subscribeState={subscribeState}
        setSubscribeState={setSubscribeState}
      />
      <Header toggleSubscribe={toggleSubscribe} />

      <main className=" bg-[#1D232A] text-[#d6d8dd] md:p-4 min-h-[calc(100vh-312px)] relative flex flex-col">
        <section className="flex justify-between md:p-4">
          {/* left sidebar */}
          <div className="hidden md:flex md:flex-col w-56 rounded-xl basis-[20%] gap-2 sticky top-20 p-4 motion-translate-x-in-25">
            {loading ? (
              <Loading />
            ) : (
              <div className="flex flex-col gap-3">
                {limitRelatedjob.map((job) => (
                  <DescriptionCardElement
                    key={job.id}
                    image={job.image}
                    descriptionOrOverview={job.overview.substring(0, 50)}
                    postionOrScholarshipName={job.position}
                    countryOrLocation={job.location}
                    salaryOrDeadline={job.salary}
                    scholarshiptypeOrDateCreated={job.datecreated}
                  />
                ))}
              </div>
            )}
          </div>
          {/* description display*/}
          <div className=" basis-auto md:basis-[55%] flex flex-col gap-2 motion-translate-y-in-75">
            {/* back */}
            <div className="  flex items-center ">
              <IoIosArrowRoundBack />
              <small
                className="hover:underline hover:text-white/50 hover:cursor-pointer"
                onClick={() => window.history.back()}
              >
                Back
              </small>
            </div>
            {loading ? (
              <Loading />
            ) : (
              <div>
                {job.map((job) => (
                  <DescriptionTemplate
                    key={job.id}
                    image={job.image}
                    imageAlt={job.company.substring(0, 2)}
                    location={job.country}
                    category={job.jobcategory}
                    companyNameOrScholarshipTitle={job.company}
                    jobOrScholarhipTitle={job.position}
                    jobDurationOrScholarshipType={job.duration}
                    datecreated={job.datecreated}
                    post={job.post}
                    link={job.website}
                  />
                ))}
              </div>
            )}
          </div>
          {/* right sidebar*/}
          <div className="md:basis-[20%] flex flex-col bg-contain gap-2 rounded-xl motion-translate-x-in-25">
            <AdvertCard image={image} />
            <AdvertCard image={image} />
          </div>
        </section>
        <section className="flex justify-between gap-2">
          <AdvertBox image={international} />
          <AdvertBox image={image} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default JobDescription;
