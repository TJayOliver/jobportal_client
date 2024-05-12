import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import SocialMedia from "../../components/Homepage/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { fetch, fetchByID, BASE_URL, CLIENT_URL } from "../request";
import parser from "html-react-parser";
import { BsCalendar, BsClock, BsPersonAdd } from "react-icons/bs";
import megaphone from "../../assets/megaphone.png";
import Subscribe from "../../components/Subscribe/Subscribe";
import Platforms from "../../components/Platforms/Platforms";
import { JobBox } from "../Job/Jobs";
import { BiSolidLocationPlus } from "react-icons/bi";
import Cookie from "../../components/Cookie/Cookie";
import axios from "axios";
import moment from "moment";
import Share from "../../components/Share/Share";
import { Helmet } from "react-helmet";

const JobDescription = () => {
  const params = useParams();
  const id = params.id;

  const [jobs, setJobs] = useState([]);

  const [FeaturedJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [cookieTracker, setCookieTracker] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("job/featured", setFeaturedJobs, setLoading, signal, setMessage);
    fetchByID(
      "job/read",
      id,
      setJobs,
      setLoading,
      signal,
      setMessage,
      setCookieTracker
    );
    return () => controller.abort();
  }, []);

  const [SubscribeState, SetSubscribeState] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [headImage, setHeadImage] = useState("");

  useEffect(() => {
    if (jobs.length > 0) {
      const job = jobs[0];
      setTitle(job.position);
      setDescription(job.overview);
      setHeadImage(`${BASE_URL}/upload/${job.image}`);
    }
  }, [jobs]);

  const stripHtmlTags = (htmlString) => {
    return htmlString.replace(/(<([^>]+)>)/gi, "");
  };
  const url = `${CLIENT_URL}/job/${id}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={stripHtmlTags(description)} />
        <meta property="og:image" itemProp="image" content={headImage} />
        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={stripHtmlTags(description)} />
        <meta name="twitter:image" content={headImage} />
      </Helmet>

      <Header />
      <Subscribe
        SubscribeState={SubscribeState}
        SetSubscribeState={SetSubscribeState}
      />
      <main className="p-2 ">
        <section className="mb-3">
          <section className=" bg-gradient-to-tr from-rose-500 to-blue-600 max-w-6xl flex m-auto  h-72 object-cover bg-center rounded-lg relative mb-14">
            <div className="rounded-full h-24 w-24 bg-white absolute -bottom-10 left-10 flex items-center justify-center drop-shadow-sm">
              {jobs.map((job, id) => (
                <div key={id} className=" h-14 w-14 rounded-full object-cover">
                  <img
                    src={`${BASE_URL}/upload/${job.image}`}
                    className="h-full w-full rounded-full"
                  />
                </div>
              ))}
            </div>
          </section>

          {loading ? (
            <Loading />
          ) : (
            jobs.map((job, id) => (
              <section
                key={id}
                className="max-w-6xl flex flex-col m-auto gap-2"
              >
                <h1 className="text-4xl font-bold">{job.position}</h1>
                <small className="text-md">{job.company}</small>
                <div className="flex gap-3 items-center">
                  <small>{job.location}</small>
                  <small className="h-2 w-2 rounded-full bg-black"></small>
                  <small>{job.duration}</small>
                </div>
              </section>
            ))
          )}
        </section>

        <section className="max-w-6xl flex flex-col md:flex-row md:flex m-auto justify-between gap-4 mb-5">
          {/* main */}
          <section
            id="decription"
            className="flex flex-col md:basis-[50rem] gap-5"
          >
            <div id="overview" className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Overview</h1>
              {loading ? (
                <Loading />
              ) : (
                jobs.map((job, id) => (
                  <div key={id} className="text-justify">
                    {parser(job.overview)}
                  </div>
                ))
              )}
            </div>

            <div id="responsibility" className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Responsibility</h1>
              {loading ? (
                <Loading />
              ) : (
                jobs.map((job, id) => (
                  <div key={id} className="text-justify">
                    {parser(job.responsibility)}
                  </div>
                ))
              )}
            </div>

            <div id="requirements" className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Requirement</h1>
              {loading ? (
                <Loading />
              ) : (
                jobs.map((job, id) => (
                  <div key={id} className="text-justify">
                    {parser(job.requirements)}
                  </div>
                ))
              )}
            </div>
          </section>

          <section id="smalldetails" className="flex flex-col gap-4">
            <div className="border border-gray-100 rounded-lg h-full md:h-[28rem] md:w-64 p-3 md:p-8 flex flex-col gap-5">
              <div id="location" className="flex flex-col gap-2">
                {loading ? (
                  <Loading />
                ) : (
                  jobs.map((job, id) => (
                    <div key={id} className="flex items-center gap-1">
                      <BiSolidLocationPlus />
                      <small className="font-bold">{job.location}</small>
                    </div>
                  ))
                )}
                <small>Click on the link to apply</small>
              </div>

              <div id="Salary">
                {loading ? (
                  <Loading />
                ) : (
                  jobs.map((job, id) => (
                    <p key={id} className="font-bold text-xl">
                      {job.salary}
                    </p>
                  ))
                )}
                <small>Average Salary</small>
              </div>

              <div
                id="category/jobtype/date"
                className="md:p-2 md:flex md:flex-col flex flex-wrap gap-2"
              >
                <div id="category" className="flex gap-2 items-center shrink-0">
                  <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <BsPersonAdd />
                  </div>
                  <div>
                    {loading ? (
                      <Loading />
                    ) : (
                      jobs.map((job, id) => (
                        <p key={id} className="font-bold">
                          {job.jobcategory}
                        </p>
                      ))
                    )}
                    <small>Job Category</small>
                  </div>
                </div>

                <div id="jobtype" className="flex gap-2 items-center shrink-0">
                  <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <BsClock />
                  </div>
                  <div>
                    {loading ? (
                      <Loading />
                    ) : (
                      jobs.map((job, id) => (
                        <p key={id} className="font-bold">
                          {job.duration}
                        </p>
                      ))
                    )}
                    <small>Job Type</small>
                  </div>
                </div>

                <div
                  id="dateposted"
                  className="flex gap-2 items-center shrink-0"
                >
                  <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
                    <BsCalendar />
                  </div>
                  <div>
                    {jobs.map((job, id) => (
                      <p key={id} className="font-bold">
                        {moment(job.datecreated).format("DD-MM-YYYY")}
                      </p>
                    ))}
                    <small>Date Posted</small>
                  </div>
                </div>
              </div>

              {loading ? (
                <Loading />
              ) : (
                jobs.map((job, id) => (
                  <a
                    key={id}
                    target="blank"
                    href={`https://${job.website}`}
                    className="bg-blue-500 hover:bg-blue-600 rounded-2xl p-2 w-full flex items-center justify-center text-white font-medium"
                  >
                    Apply for this Job
                  </a>
                ))
              )}
            </div>

            {/* Share Job */}
            <div
              id="share"
              className="bg-white border border-gray-100 rounded-lg md:h-42 md:w-64 p-2 gap-3 flex flex-col"
            >
              <div>
                <h1 className="font-bold">Share This Job</h1>
                <small>Let People Know!</small>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <Share url={url} title={title} description={description} />
              </div>
            </div>
          </section>
        </section>

        {/* related Jobs */}
        <section className="max-w-6xl m-auto flex flex-col gap-2 mb-3">
          <p className="font-bold text-xl md:text-2xl">Related Jobs</p>
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2">
            {loading ? (
              <Loading />
            ) : (
              FeaturedJobs.map((job, id) => (
                <JobBox
                  key={id}
                  image={job.image}
                  location={job.location}
                  company={job.company}
                  duration={job.duration}
                  position={job.position}
                  category={job.categoryname}
                  salary={job.salary}
                  description={job.responsibility}
                  to={`/job/${job.id}/${job.position}`}
                />
              ))
            )}
          </div>
        </section>

        {/* subscribe */}
        <section
          className={
            "flex justify-between p-2 bg-gradient-to-tr from-blue-500 to-teal-500 rounded-md items-center mt-1 mb-2 h-82 max-w-6xl m-auto"
          }
        >
          <div className="text-white">
            <p className=" text-xl md:text-3xl font-medium">
              Job Alert E-mails{" "}
            </p>
            <small>
              Keep track of positions that you're interested in by signing up
              for job alert emails
            </small>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-white/90 to-white flex flex-col items-center justify-center gap-4 h-48 w-44 p-1">
            <img
              src={megaphone}
              className=" object-cover h-32"
              loading="lazy"
            />
            <button
              onClick={() => SetSubscribeState(true)}
              className="p-2 bg-gradient-to-tr from-blue-500 to-teal-500 w-full text-sm whitespace-nowrap rounded-md text-white font-medium"
            >
              Notify Me
            </button>
          </div>
        </section>
      </main>
      <Platforms />
      <SocialMedia />
      {/* {cookieTracker ? <Cookie /> : null} */}
      <Footer onClick={() => SetSubscribeState(true)} />
    </>
  );
};

export default JobDescription;
