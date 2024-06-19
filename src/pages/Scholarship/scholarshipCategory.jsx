/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { fetch, BASE_URL } from "../request";
import Loading from "../../components/Loading/Loading";
import { LatestBox } from "../Article/article";
import { ScholarshipBox } from "./scholarship";
import Pagination from "../../components/Pagination/Pagination";
import Platforms from "../../components/Platforms/Platforms";
import Subscribe from "../../components/Subscribe/Subscribe";
import Cookie from "../../components/Cookie/Cookie";
import moment from "moment";

const Scholarship = () => {
  const params = useParams();
  const category = params.category;

  const [scholarships, setScholarship] = useState([]);
  const [article, setArticle] = useState([]);

  const [governmentScholarship, setGovernmentScholarships] = useState([]);
  const [organizationalScholarship, setOrganizationalScholarships] = useState([]);
  const [privateScholarship, setPrivateScholarships] = useState([]);
  const [researchScholarship, setResearchScholarships] = useState([]);
  const [internationalScholarship, setInternationalScholarships] = useState([]);
  const [cookieTracker, setCookieTracker] = useState(null);

  const [loading, setLoading] = useState(true);
  const [postPerPage, setPostPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("scholarship", setScholarship, setLoading, signal, setMessage, setCookieTracker);
    fetch("article/category/Scholarship", setArticle, setLoading, signal, setMessage);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (category === "Government") {
      fetch(
        "scholarship/category/Government",
        setGovernmentScholarships,
        setLoading,
        signal,
        setMessage
      );
    }
    if (category === "Organizational") {
      fetch(
        "scholarship/category/Organizational",
        setOrganizationalScholarships,
        setLoading,
        signal,
        setMessage
      );
    }
    if (category === "Private") {
      fetch("scholarship/category/Private", setPrivateScholarships, setLoading, signal, setMessage);
    }
    if (category === "International") {
      fetch(
        "scholarship/category/International",
        setInternationalScholarships,
        setLoading,
        signal,
        setMessage
      );
    }
    if (category === "Research") {
      fetch(
        "scholarship/category/Research",
        setResearchScholarships,
        setLoading,
        signal,
        setMessage
      );
    }
    return () => controller.abort();
  }, [category]);

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
      const response = await axios.post(`${BASE_URL}/scholarship/search`, searchInput);
      setSResultsVerifier(true);
      setSearchResults(response.data.data);
    } catch (error) {
      setSearchResults(error.response.data.message);
    }
  };

  const [SubscribeState, SetSubscribeState] = useState(false);

  const lastPageIndex = currentPage * postPerPage;
  const firstPageIndex = lastPageIndex - postPerPage;

  const allScholars = scholarships.slice(firstPageIndex, lastPageIndex);
  const gov = governmentScholarship.slice(firstPageIndex, lastPageIndex);
  const org = organizationalScholarship.slice(firstPageIndex, lastPageIndex);
  const priv = privateScholarship.slice(firstPageIndex, lastPageIndex);
  const res = researchScholarship.slice(firstPageIndex, lastPageIndex);
  const int = internationalScholarship.slice(firstPageIndex, lastPageIndex);
  const searchResultsData = searchResults.slice(firstPageIndex, lastPageIndex);

  const colorChange =
    category === "Government"
      ? "bg-gradient-to-r from-cyan-500 to-blue-500"
      : category === "Organizational"
      ? "bg-gradient-to-r from-fuchsia-500 to-cyan-500"
      : category === "Private"
      ? "bg-gradient-to-r from-blue-600 to-violet-600"
      : category === "International"
      ? "bg-gradient-to-r from-violet-500 to-purple-500"
      : category === "Research"
      ? "bg-gradient-to-r from-fuchsia-600 to-purple-600"
      : null;

  return (
    <>
      <Header />

      <Subscribe SubscribeState={SubscribeState} SetSubscribeState={SetSubscribeState} />

      {/* heading */}
      <aside className="w-full h-[20rem] flex relative">
        <div
          className={`w-full flex flex-col justify-center absolute z-10 bottom-0 ${colorChange} max-w-5xl m-auto h-40`}
        >
          <p className="text-white text-3xl md:text-5xl font-bold p-2">{category} Scholarships</p>
          <p className="text-sm font-bold md:text-md p-2 ">
            Browse through thousands of {category} Scholarships
          </p>
        </div>
        <img
          loading="lazy"
          src={
            category === "Government"
              ? govImage
              : category === "Organizational"
              ? orgImage
              : category === "Private"
              ? privImage
              : category === "International"
              ? intImage
              : category === "Research"
              ? resImage
              : null
          }
          className="w-full object-cover absolute h-full "
        />
      </aside>

      <main className="max-w-5xl flex flex-col m-auto justify-center ">
        {/* Scholarships */}
        <section className="flex flex-col justify-center py-3 p-2">
          <div className="">
            <p className="font-bold text-4xl mb-2">Explore</p>
          </div>

          <div className="flex flex-col justify-between gap-2">
            {/* scholarships and search by country results */}

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
                <p>Search</p>
              </button>
            </form>

            {SResultsVerifier ? (
              // search results
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
                {loading ? (
                  <Loading className="justify-center m-auto" />
                ) : (
                  <div>
                    <div className="flex flex-wrap gap-4">
                      {searchResults.length === 0
                        ? `No Scholarships for ${searchInput.country} Found`
                        : searchResultsData.map((list, id) => (
                            <ScholarshipBox
                              key={id}
                              image={list.image}
                              scholarshiptype={list.scholarshiptype}
                              agent={list.agent}
                              date={list.datecreated}
                              location={list.country}
                              scholarshipname={list.scholarshipname}
                              description={list.description.slice(0, 100)}
                              to={`/scholarship/${list.scholarshipname}/${list.id}`}
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
              // display all scholarships by category
              <div>
                {category === "Government" ? (
                  <div>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
                      {gov.map((list, id) => (
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
                      ))}
                    </div>
                    <Pagination
                      totalPost={governmentScholarship.length}
                      postPerPage={postPerPage}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                    />
                  </div>
                ) : category === "Organizational" ? (
                  <div>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
                      {org.map((list, id) => (
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
                      ))}
                      <Pagination
                        totalPost={organizationalScholarship.length}
                        postPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                      />
                    </div>
                  </div>
                ) : category === "Private" ? (
                  <div>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
                      {priv.map((list, id) => (
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
                      ))}
                    </div>
                    <Pagination
                      totalPost={privateScholarship.length}
                      postPerPage={postPerPage}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                    />
                  </div>
                ) : category === "Research" ? (
                  <div>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
                      {res.map((list, id) => (
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
                      ))}
                    </div>
                    <Pagination
                      totalPost={researchScholarship.length}
                      postPerPage={postPerPage}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                    />
                  </div>
                ) : category === "International" ? (
                  <div>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
                      {int.map((list, id) => (
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
                      ))}
                    </div>
                    <Pagination
                      totalPost={internationalScholarship.length}
                      postPerPage={postPerPage}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
                      {allScholars.map((list, id) => (
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
                      ))}
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
            )}
          </div>
        </section>

        {/* categories and slide buttons */}
        <section>
          <div id="heading-and-buttons" className="flex justify-between p-2">
            <p className="font-bold text-2xl md:text-4xl">Browse Other Categories</p>
            <div className="text-3xl flex gap-4 items-center over">
              <BsArrowLeftSquare id="leftbtn" onClick={handleLeftClick} />
              <BsArrowRightSquare id="rightbtn" onClick={handleRightClick} />
            </div>
          </div>

          <div
            id="container"
            className="flex justify-between p-2 gap-2 overflow-x-scroll scrollbar duration-100 ease-in shrink-0"
          >
            <ScholarshipCategoryBox
              color={colorChange}
              category="Government"
              text="Government Scholarships"
              image={govImage}
              to={"/scholarship/category/Government"}
            />
            <ScholarshipCategoryBox
              color={colorChange}
              category="Organizational"
              text="Organizational Scholarships"
              image={orgImage}
              to={"/scholarship/category/Organizational"}
            />
            <ScholarshipCategoryBox
              color={colorChange}
              category="International"
              text="International Scholarships"
              image={intImage}
              to={"/scholarship/category/International"}
            />
            <ScholarshipCategoryBox
              color={colorChange}
              category="Private"
              text="Private Scholarships"
              image={privImage}
              to={"/scholarship/category/Private"}
            />
            <ScholarshipCategoryBox
              color={colorChange}
              category="Research"
              text="Research Scholarships"
              image={resImage}
              to={"/scholarship/category/Research"}
            />
          </div>
        </section>

        {/* Quick Scholarship Tip */}
        <section className="flex flex-col justify-center py-2 p-2">
          <div className="p-4">
            <p className="font-bold text-2xl md:text-4xl mb-2">Quick Scholarship Tip </p>
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
                  datecreated={moment(post.datecreated).format("YYYY-MM-DD")}
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
