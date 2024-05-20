import { useState, useEffect } from "react";
import image from "../../assets/eight.jpg";
import orgImage from "../../assets/organizational.png";
import resImage from "../../assets/research.jpg";
import govImage from "../../assets/government.jpg";
import privImage from "../../assets/private.jpg";
import intImage from "../../assets/international.jpg";
import axios from "axios";
import Header from "../../components/Header/Header";
import SocialMedia from "../../components/Homepage/SocialMedia/SocialMedia";
import Footer from "../../components/Footer/Footer";
import ScholarshipCategoryBox from "../../components/Scholarships/ScholarshipCat";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { fetch, BASE_URL } from "../request.js";
import Loading from "../../components/Loading/Loading";
import { LatestBox } from "../Article/article";
import Pagination from "../../components/Pagination/Pagination";
import { TypeAnimation } from "react-type-animation";
import Platforms from "../../components/Platforms/Platforms";
import Subscribe from "../../components/Subscribe/Subscribe";
import parser from "html-react-parser";
import Cookie from "../../components/Cookie/Cookie";
import moment from "moment";

export const ScholarshipBox = ({
  image,
  country,
  scholarshiptype,
  scholarshipname,
  description,
  agent,
  to,
}) => {
  return (
    <div className="h-[26rem] w-full md:w-[15rem] rounded-lg flex flex-col shrink-0">
      <img
        src={`${image}`}
        className=" h-44 rounded-t-lg object-cover w-full"
      />
      <div className="p-2 flex flex-col gap-2">
        <div className="font-bold text-lg">
          <a className="hover:underline" href={to}>
            {scholarshipname}
          </a>
        </div>
        <p>{country}</p>
        <small className="line-clamp-5">{parser(`${description}`)}</small>
        <div className="flex gap-2">
          <small>{agent}</small>
          <small>{scholarshiptype}</small>
        </div>
      </div>
    </div>
  );
};

const Scholarship = () => {
  const [scholarships, setScholarship] = useState([]);
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postPerPage, setPostPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState("");
  const [cookieTracker, setCookieTracker] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(
      "scholarship",
      setScholarship,
      setLoading,
      signal,
      setMessage,
      setCookieTracker
    );
    fetch(
      "article/category/Scholarship",
      setArticle,
      setLoading,
      signal,
      setMessage
    );

    return () => controller.abort();
  }, []);

  const container = document.getElementById("container");

  const handleLeftClick = () => {
    const scrollNumber = 100;
    container.scrollLeft -= scrollNumber;
  };
  const handleRightClick = () => {
    const scrollNumber = 100;
    container.scrollLeft += scrollNumber;
  };

  const [searchInput, setSearchInput] = useState({ country: "" });

  const handleSearchInputs = (e) => {
    const { name, value } = e.target;
    setSearchInput((prev) => ({ ...prev, [name]: value }));
  };
  const [searchResults, setSearchResults] = useState([]);
  const [SResultsVerifier, setSResultsVerifier] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/scholarship/search`,
        searchInput
      );
      setSResultsVerifier(true);
      setSearchResults(response.data.data);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const [SubscribeState, SetSubscribeState] = useState(false);

  const lastPageIndex = currentPage * postPerPage;
  const firstPageIndex = lastPageIndex - postPerPage;
  const scholarshipSlicedData = scholarships.slice(
    firstPageIndex,
    lastPageIndex
  );
  const searchResultsData = searchResults.slice(firstPageIndex, lastPageIndex);

  return (
    <>
      <Header />

      <Subscribe
        SubscribeState={SubscribeState}
        SetSubscribeState={SetSubscribeState}
      />

      {/* text animation */}
      <aside className="h-36 flex items-center relative bg-gradient-to-r from-cyan-500 to-blue-500 m-auto ">
        <div className="m-auto max-w-5xl w-full text-4xl font-medium text-white">
          <div className="">
            <TypeAnimation
              sequence={[
                "Every One Deserves a Scholarship",
                "Your Time is Now",
                "Apply",
              ]}
              speed={300}
              repeat={Infinity}
            />
          </div>
        </div>
      </aside>

      <main className="max-w-5xl flex flex-col m-auto justify-center ">
        <section className=" bg-red-500 hidden w-full h-[8rem] ">
          <div className="w-2/4 rounded-2xl px-6 py-10 flex flex-col gap-4">
            <p className="text-white text-5xl font-bold">
              Every Bright Student Deserves a Scholarships
            </p>
            <p>
              Bigger Scholarship packages to achieve your dreams, we provide all
              of these great things for you
            </p>
          </div>
          <img src={image} className="w-2/4 object-cover rounded-r-2xl" />
        </section>

        {/* Scholarship Categories */}
        <section className=" flex flex-col justify-center py-1">
          <div className="p-4">
            <p className="font-bold text-4xl mb-2">Scholarship Categories</p>

            <div className="flex justify-between">
              <p>
                Many categories are presented, each containing numerous
                scholarships and ready for you to browse through
              </p>
              <div className="text-3xl flex gap-4 ">
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
          </div>

          <div
            id="container"
            className="flex justify-between p-2 gap-2 overflow-x-scroll scrollbar duration-100 ease-in shrink-0 "
          >
            <ScholarshipCategoryBox
              category="Government"
              text="Government Scholarships"
              image={govImage}
              to={"/scholarship/category/Government"}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
            <ScholarshipCategoryBox
              category="Organizational"
              text="Organizational Scholarships"
              image={orgImage}
              to={"/scholarship/category/Organizational"}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
            <ScholarshipCategoryBox
              category="International"
              text="International Scholarships"
              image={intImage}
              to={"/scholarship/category/International"}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
            <ScholarshipCategoryBox
              category="Private"
              text="Private Scholarships"
              image={privImage}
              to={"/scholarship/category/Private"}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
            <ScholarshipCategoryBox
              category="Research"
              text="Research Scholarships"
              image={resImage}
              to={"/scholarship/category/Research"}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>
        </section>

        {/* all Scholarships */}
        <section className="flex flex-col justify-center py-3 p-2">
          <div className="p-4">
            <p className="font-bold text-4xl mb-2">Explore</p>
          </div>
          <div className="flex justify-center gap-2">
            {/* scholarships and search by country results */}
            <div className=" flex flex-col gap-4 w-full">
              <form
                onSubmit={submit}
                className="flex justify-between border-gray-100 border-2 rounded-lg"
              >
                {/* Location Search */}
                <div className="relative w-full">
                  <BiSearch className=" absolute text-2xl left-2 top-2.5 " />
                  <input
                    type="text"
                    placeholder="search by country"
                    name="country"
                    value={searchInput.country}
                    onChange={handleSearchInputs}
                    className="px-9 w-full rounded-r-lg p-2 outline-none placeholder:relative placeholder:left-2 placeholder:text-sm"
                  />
                </div>

                <button
                  type="search"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-700 h-8 flex items-center rounded-lg text-white p-2 ml-1 mt-1 whitespace-nowrap"
                >
                  <p>Find Scholarships</p>
                </button>
              </form>
              {SResultsVerifier ? (
                // search results
                <div className="flex flex-col gap-4">
                  {loading ? (
                    <Loading className="justify-center m-auto" />
                  ) : (
                    <div>
                      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
                        {searchResults.length === 0
                          ? `No Scholarships for ${searchInput.country} Found`
                          : searchResultsData.map((list, id) => (
                              <ScholarshipBox
                                key={id}
                                image={list.image}
                                agent={list.agent}
                                scholarshiptype={list.scholarshiptype}
                                country={list.country}
                                scholarshipname={list.scholarshipname}
                                description={list.description}
                                to={`/scholarship/${list.id}`}
                              />
                            ))}
                      </div>
                      <Pagination
                        totalPost={searchResults.length}
                        postPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                      />
                    </div>
                  )}
                </div>
              ) : (
                // all scholarships
                <div>
                  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
                    {loading ? (
                      <Loading />
                    ) : (
                      scholarshipSlicedData.map((list, id) => (
                        <ScholarshipBox
                          key={id}
                          image={list.image}
                          agent={list.agent}
                          scholarshiptype={list.scholarshiptype}
                          country={list.country}
                          scholarshipname={list.scholarshipname}
                          description={list.description.slice(0, 100)}
                          to={`/scholarship/${list.id}`}
                        />
                      ))
                    )}
                  </div>
                  <Pagination
                    totalPost={scholarships.length}
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Quick Scholarship Tip */}
        <section className="flex flex-col justify-center py-2 p-2">
          <div className="p-4">
            <p className="font-bold text-2xl md:text-4xl mb-2">
              Quick Scholarship Tip{" "}
            </p>
          </div>
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-4  ">
            {loading ? (
              <Loading />
            ) : (
              article.map((post, id) => (
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
        </section>
      </main>

      {/* whatsapp barcode */}
      <Platforms />
      <SocialMedia />
      {/* {cookieTracker ? <Cookie /> : null} */}
      <Footer onClick={() => SetSubscribeState(true)} />
    </>
  );
};

export default Scholarship;
