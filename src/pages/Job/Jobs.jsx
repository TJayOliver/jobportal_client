/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Header from "../../components/Header/Header";
import SocialMedia from "../../components/Homepage/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import { fetch, BASE_URL } from "../request";
import axios from "axios";
import Subscribe from "../../components/Subscribe/Subscribe";
import Platforms from "../../components/Platforms/Platforms";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import { countries } from "../../components/Dashboard/countries";
import { FaSearch } from "react-icons/fa";
import { LatestBox } from "../Article/article";
import pic from "../../assets/p3.png";
import SubscribeBlueBox from "../../components/Subscribe/subscribeBlueBox";
import Cookie from "../../components/Cookie/Cookie";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import logo from "../../assets/logo.png";

export const JobBox = ({ image, location, company, duration, position, salary, to }) => {
  return (
    <div
      className={`h-64 w-full md:w-[15rem] p-2 rounded-lg bg-white flex flex-col shrink-0 hover:bg-gradient-to-tr hover:from-blue-500 hover:to-teal-500 group hover:text-gray-100 duration-150 ease-in drop-shadow-md gap-5`}
    >
      <div className="flex items-center gap-4">
        <div className=" h-8 w-8 rounded-md shrink-0 flex object-cover ">
          <img src={`${image}`} className="object-cover h-full w-full rounded-md" />
        </div>
        <div className="flex flex-col">
          <p className="font-bold whitespace-wrap line-clamp-1 md:line-clamp-none text-sm">
            {company}
          </p>
          <small>{location}</small>
        </div>
      </div>

      <p className="font-bold text-md">{position}</p>
      <p>{duration}</p>

      <div className="  flex flex-wrap justify-between ">
        <div className="flex items-center">
          <small className=" font-bold">GHC {salary}</small>
          <small>/Month</small>
        </div>
        <button className="group-hover:bg-white mt-3 bg-blue-500 font-medium shrink-0 group-hover:text-black text-white p-2 rounded-md">
          <a href={to}> Apply Now </a>
        </button>
      </div>
    </div>
  );
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [featuredjobs, setFeaturedJobs] = useState([]);
  const [jobTip, setJobTip] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookieTracker, setCookieTracker] = useState(null);

  const [postPerPage, setPostPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("job", setJobs, setLoading, signal, setMessage, setCookieTracker);
    fetch("job/featured", setFeaturedJobs, setLoading, signal, setMessage);
    fetch("article/category/Job", setJobTip, setLoading, signal, setMessage);
    fetch("category", setCategories, setLoading, signal, setMessage);

    return () => controller.abort();
  }, []);

  const lastPageIndex = currentPage * postPerPage,
    firstPageIndex = lastPageIndex - postPerPage;
  const post = jobs.slice(firstPageIndex, lastPageIndex);

  const [SubscribeState, SetSubscribeState] = useState(false);

  const container = document.getElementById("container");

  const handleLeftClick = () => {
    const scrollNumber = 100;
    container.scrollLeft -= scrollNumber;
  };
  const handleRightClick = () => {
    const scrollNumber = 100;
    container.scrollLeft += scrollNumber;
  };

  const [filterSearch, setFilterSearch] = useState({
    position: "",
    duration: "",
    jobcategory: "",
    location: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchVerifier, setSearchVerifier] = useState(false);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setFilterSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/job/search`, filterSearch);
      const data = response.data.data;
      setSearchResults(data);
      setSearchVerifier(true);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Future Forte" />
        <meta property="og:title" content="Jobs" />
        <meta
          property="og:description"
          content="Future Forte is a platform dedicated to connecting, graduates, students to endless job opportunities"
        />
        <meta property="og:url" content="https://futureforte.netlify.app" />
        <meta property="og:type" content="article" />
        <meta property="article:publisher" content="https://futureforte.netlify.app" />
        <meta property="og:image" content={logo} />
        <meta property="og:image:secure_url" content={logo} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jobs" />
        <meta
          name="twitter:description"
          content="Future Forte is a platform dedicated to connecting, graduates, students to endless job opportunities"
        />
        <meta name="twitter:image" content={logo} />
        <meta name="twitter:url" content="https://futureforte.netlify.app" />
      </Helmet>

      <Header />
      <Subscribe SubscribeState={SubscribeState} SetSubscribeState={SetSubscribeState} />

      <aside className="bg-gray-50 h-96 p-8 flex justify-center">
        <div className="max-w-5xl flex items-center">
          <div className="flex flex-col gap-3 w-full">
            <h1 className="text-5xl font-bold">
              Search Through{" "}
              <b className="bg-gradient-to-tr from-blue-500 to-teal-500 text-transparent bg-clip-text">
                1000+
              </b>{" "}
              Jobs
            </h1>
            <small>
              Explore thousands of job opportunities with all the information you need. It's your
              future. Come find it!
            </small>
          </div>
          <div className="w-full">
            <img src={pic} className="h-96 w-full object-cover" />
          </div>
        </div>
      </aside>

      <main className="max-w-5xl flex flex-col m-auto justify-center p-2">
        {/* featured / popular  */}
        <section className={searchVerifier ? "hidden" : " flex flex-col justify-center  py-1"}>
          <div className="flex justify-between mb-2">
            <p className="font-bold text-2xl md:text-2xl mb-2">Explore Popular Jobs</p>
            {/* for small screens */}
            <div className="text-3xl flex gap-4 md:hidden">
              <BsArrowLeftSquare
                id="leftbtn"
                onClick={handleLeftClick}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white cursor-pointer"
              />
              <BsArrowRightSquare
                id="rightbtn"
                onClick={handleRightClick}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white cursor-pointer"
              />
            </div>
          </div>

          <div
            id="container"
            className="flex justify-between p-2 gap-4 overflow-x-scroll scrollbar duration-100 ease-in shrink-0"
          >
            {featuredjobs.map((job, id) => (
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
                to={`/job/${job.id}`}
              />
            ))}
          </div>
        </section>

        <SubscribeBlueBox onClick={() => SetSubscribeState(true)} />

        {/* Search  */}
        <form
          onSubmit={submitSearch}
          className="flex  gap-2 p-2 rounded-md items-center w-full bg-gradient-to-r from-white/90 to-white"
        >
          <input
            type="text"
            name="position"
            onChange={handleSearch}
            value={filterSearch.position}
            placeholder="Job Title"
            className="border-gray-100 border-[1px] placeholder:text-black rounded-md p-1 w-full outline-gray-200 h-14"
          />

          <select
            name="duration"
            onChange={handleSearch}
            value={filterSearch.duration}
            className="border-gray-100 border-[1px] rounded-md p-1 w-full outline-gray-200 h-14"
          >
            <option disabled value="">
              --Select Work Type--
            </option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>

          <select
            name="jobcategory"
            onChange={handleSearch}
            value={filterSearch.jobcategory}
            className="border-gray-100 border-[1px] rounded-md p-1 w-full outline-gray-200 h-14"
          >
            <option disabled value="">
              --Select Category--
            </option>
            {categories.map((category, id) => (
              <option key={id} value={category.categoryname}>
                {category.categoryname}
              </option>
            ))}
          </select>

          <select
            name="location"
            onChange={handleSearch}
            value={filterSearch.location}
            className=" border-[1px] rounded-md p-1 w-full h-14 border-gray-100 outline-none"
          >
            <option disabled value="">
              -- Select Country --
            </option>
            {countries.map((country, id) => (
              <option key={id} value={country}>
                {country}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className=" rounded-full w-14 p-2 bg-gradient-to-tr from-blue-500 to-teal-500"
          >
            <FaSearch className="text-white text-xl" />
          </button>
        </form>

        {searchVerifier && searchResults.length > 0 ? (
          <section className="flex flex-col justify-center items-center p-1">
            <p className="text-2xl font-bold mb-2">Search Results</p>
            <div>
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
                {loading ? (
                  <Loading />
                ) : (
                  searchResults.map((job, id) => (
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
                      to={`/job/${job.id}`}
                    />
                  ))
                )}
              </div>
              <Pagination
                totalPost={jobs.length}
                postPerPage={postPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </section>
        ) : searchVerifier === true && searchResults ? (
          <p className="font-medium text-xl">No Results for the Query</p>
        ) : null}

        {/*  Jobs */}
        <section>
          <p className="font-bold text-2xl md:text-2xl mb-3">Job Listing</p>
          <div
            className={
              'searchVerifier ? "hidden" : grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 '
            }
          >
            {loading ? (
              <Loading />
            ) : (
              post.map((job, id) => (
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
                  to={`/job/${job.id}`}
                />
              ))
            )}
          </div>
          <Pagination
            totalPost={jobs.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </section>

        {/* Job Tip */}
        <p className="font-bold text-2xl md:text-2xl mb-3">Quick Job Tip</p>
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
          {loading ? (
            <Loading />
          ) : (
            jobTip.map((post, id) => (
              <LatestBox
                key={id}
                image={post.image}
                author={post.author}
                datecreated={moment(post.datecreated).format("DD-MM-YYYY")}
                title={post.title}
                brief={post.post.slice(0, 100)}
                category={post.category}
                to={`/article/${post.id}`}
              />
            ))
          )}
        </div>
      </main>

      <Platforms />
      <SocialMedia />
      {/* {cookieTracker ? <Cookie /> : null} */}
      <Footer onClick={() => SetSubscribeState(true)} />
    </>
  );
};

export default Jobs;
