import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { TypeAnimation } from "react-type-animation";
import { FaShareFromSquare } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart, IoFilter } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { fetch, BASE_URL } from "./request";
import government from "../assets/government.jpg";
import built from "../assets/built.jpg";
import AdvertBox from "../components/Advert/advertBox";
import Pagination from "../components/Pagination/Pagination";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import SearchBar from "../components/searchBar";

const CardElement = ({
  image,
  description,
  scholarshipname,
  country,
  deadline,
  scholarshiptype,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-[#0F141E] border-slate-600 h-60 max-w-screen-xl relative rounded-md shadow-lg border motion-translate-y-in-100">
      {/* image,location,title,share */}
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-1">
          <div className="h-9 w-9 rounded-full shrink-0 flex bg-[#2d2e32]">
            <img
              src={image}
              alt="OP"
              className="h-full w-full bg-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm text-white inline md:hidden">
              {scholarshipname.substring(0, 50)}..
            </h1>
            <h1 className="text-sm hidden md:inline text-white">
              {scholarshipname.substring(0, 20)}..
            </h1>
            <small className="text-[12px] text-white">{country}</small>
          </div>
        </div>
        {/* share */}
        <FaShareFromSquare />
      </div>
      {/* short description */}
      <div className="px-4">
        <span className="text-sm inline md:hidden lg:hidden">
          {description.substring(0, 15)}..
        </span>
        <span className="text-sm hidden md:inline lg:hidden">
          {description.substring(0, 10)}..
        </span>
        <span className="text-sm hidden md:hidden lg:inline">
          {description.substring(0, 30)}..
        </span>
        <hr className="mt-2"></hr>
      </div>
      {/* salary,date posted */}
      <div className="flex items-center justify-between p-4">
        <div className="text-[12px] flex items-center">
          <p>{deadline}</p>
        </div>
        <div className="flex items-center text-[12px] gap-1">
          {scholarshiptype}
        </div>
      </div>
      {/* buttons */}
      <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 gap-1 flex justify-between items-center">
        <button className="bg-gradient-to-r flex justify-center h-10 items-center  from-[#641B2E] to-[#3a111c]  w-full p-2 text-slate-200 rounded-xl hover:motion-preset-fade hover:motion-duration-2000">
          <p className="duration-100 ease-in">Apply</p>
        </button>
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

const NewScholarship = () => {
  const [scholarships, setScholarship] = useState([
    {
      id: "sch-001",
      image: "https://example.com/images/chevening.jpg",
      imagename: "chevening-scholarship",
      scholarshipname: "Chevening Scholarship",
      deadline: "2024-11-07",
      description:
        "The UK government's global scholarship program for future leaders to study in the UK.",
      scholarshiptype: "Fully Funded",
      programs: "Masters Degree",
      scholarshipcategory: "Government",
      country: "United Kingdom",
      post: "Posted by UK Foreign Office",
      author: "admin1",
      datecreated: "2024-01-15",
    },
    {
      id: "sch-002",
      image: "https://example.com/images/fulbright.jpg",
      imagename: "fulbright-program",
      scholarshipname: "Fulbright Foreign",
      deadline: "2024-10-15",
      description:
        "Funded by the U.S. Department of State for international students to study in America.",
      scholarshiptype: "Fully Funded",
      programs: "All Levels",
      scholarshipcategory: "Government",
      country: "United States",
      post: "Posted by U.S. Embassy",
      author: "admin2",
      datecreated: "2024-02-20",
    },
    {
      id: "sch-003",
      image: "https://example.com/images/daad.jpg",
      imagename: "daad-scholarship",
      scholarshipname: "DAAD Scholarship",
      deadline: "2024-09-30",
      description:
        "German Academic Exchange Service funding for international students.",
      scholarshiptype: "Partially Funded",
      programs: "Masters Degree",
      scholarshipcategory: "International",
      country: "Germany",
      post: "Posted by DAAD",
      author: "admin3",
      datecreated: "2024-03-10",
    },
    {
      id: "sch-004",
      image: "https://example.com/images/vanier.jpg",
      imagename: "vanier-scholarship",
      scholarshipname: "Vanier Graduate Scholarship",
      deadline: "2024-08-01",
      description:
        "Canadian government scholarship for doctoral students demonstrating leadership.",
      scholarshiptype: "Fully Funded",
      programs: "Doctorate Degree",
      scholarshipcategory: "Government",
      country: "Canada",
      post: "Posted by Canadian Universities",
      author: "admin1",
      datecreated: "2024-01-25",
    },
    {
      id: "sch-005",
      image: "https://example.com/images/erasmus.jpg",
      imagename: "erasmus-mundus",
      scholarshipname: "Erasmus Mundus Joint Masters",
      deadline: "2024-12-15",
      description:
        "EU-funded program for international students to study across multiple European countries.",
      scholarshiptype: "Fully Funded",
      programs: "Masters Degree",
      scholarshipcategory: "International",
      country: "France",
      post: "Posted by EU Commission",
      author: "admin4",
      datecreated: "2024-04-05",
    },
    {
      id: "sch-006",
      image: "https://example.com/images/gates-cambridge.jpg",
      imagename: "gates-cambridge",
      scholarshipname: "Gates Cambridge Scholarship",
      deadline: "2024-10-12",
      description:
        "Full-cost scholarship for outstanding applicants to pursue postgraduate degrees at Cambridge.",
      scholarshiptype: "Fully Funded",
      programs: "Post Graduate Diploma",
      scholarshipcategory: "Private",
      country: "United Kingdom",
      post: "Posted by Cambridge University",
      author: "admin2",
      datecreated: "2024-02-15",
    },
    {
      id: "sch-007",
      image: "https://example.com/images/aeon.jpg",
      imagename: "aeon-scholarship",
      scholarshipname: "AEON Scholarship",
      deadline: "2024-07-31",
      description:
        "Japanese corporate scholarship for Asian students to study in Japan.",
      scholarshiptype: "Partially Funded",
      programs: "Bachelors Degree",
      scholarshipcategory: "Private",
      country: "Japan",
      post: "Posted by AEON Foundation",
      author: "admin5",
      datecreated: "2024-05-01",
    },
    {
      id: "sch-008",
      image: "https://example.com/images/endeavour.jpg",
      imagename: "endeavour-postgraduate",
      scholarshipname: "Endeavour Postgraduate Scholarship",
      deadline: "2024-06-30",
      description:
        "Australian government award for international students to undertake postgraduate study.",
      scholarshiptype: "Fully Funded",
      programs: "Masters Degree",
      scholarshipcategory: "Government",
      country: "Australia",
      post: "Posted by Australian Department of Education",
      author: "admin3",
      datecreated: "2024-03-22",
    },
    {
      id: "sch-009",
      image: "https://example.com/images/ethz.jpg",
      imagename: "eth-zurich",
      scholarshipname: "ETH Excellence Scholarship",
      deadline: "2024-12-01",
      description:
        "Merit-based scholarship for excellent students at ETH Zurich.",
      scholarshiptype: "Partially Funded",
      programs: "Masters Degree",
      scholarshipcategory: "Organizational",
      country: "Switzerland",
      post: "Posted by ETH Zurich",
      author: "admin1",
      datecreated: "2024-01-10",
    },
    {
      id: "sch-010",
      image: "https://example.com/images/axol.jpg",
      imagename: "axol-science",
      scholarshipname: "Axol Science Scholarship for Women",
      deadline: "2024-09-15",
      description:
        "Private scholarship supporting women in STEM fields worldwide.",
      scholarshiptype: "Partially Funded",
      programs: "All Levels",
      scholarshipcategory: "Private",
      country: "United States",
      post: "Posted by Axol Foundation",
      author: "admin4",
      datecreated: "2024-04-18",
    },
  ]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [cookieTracker, setCookieTracker] = useState(null);
  const [postPerPage, setPostPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsVerified, setSearchResultsVerified] = useState(false);
  const inputRef = useRef(null);
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible]);

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
    return () => controller.abort();
  }, []);

  const [searchInput, setSearchInput] = useState({ scholarshipname: "" });

  const handleSearchInputs = (e) => {
    const { name, value } = e.target;
    setSearchInput((prev) => ({ ...prev, [name]: value }));
  };

  const searchScholarshipByName = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/scholarship/search`,
        searchInput
      );
      setSearchResultsVerified(true);
      setSearchResults(response.data.data);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const lastPageIndex = currentPage * postPerPage;
  const firstPageIndex = lastPageIndex - postPerPage;
  const post = scholarships.slice(firstPageIndex, lastPageIndex);
  return (
    <>
      <Header />
      {/* text animation */}
      <aside className=" h-[4rem] flex items-center relative bg-gradient-to-r from-cyan-500 to-blue-500 m-auto ">
        <div className="m-auto max-w-5xl w-full text-2xl md:text-4xl font-medium text-white">
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
      {/* scholarship image */}
      <section className="">
        <img src={government} className=" h-32 w-full object-cover" />
      </section>
      <main className="bg-[#1D232A] text-[#d6d8dd] p-4 bg-cover min-h-[calc(100vh-312px)] relative ">
        <section className="flex justify-between p-4">
          {/* side bar */}
          <div className="hidden md:flex md:flex-col h-fit w-56 border border-slate-400 rounded-xl basis-[20%] gap-2 sticky top-32 p-4 motion-translate-y-in-100">
            {/* heading */}
            <div className="flex justify-between">
              <h1>Filter</h1>
              <p className="hover:text-red-500 hover:underline cursor-pointer">
                Reset
              </p>
            </div>
            {/* Scholarship Type */}
            <div>
              <p className="font-bold text-white">Scholarship Type</p>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Fully Funded"
                  value="Fully Funded"
                  className=" accent-[#8E1616]"
                />
                <p>Part Time</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Partially Funded"
                  value="Partially Funded"
                  className=" accent-[#8E1616]"
                />
                <p>Full Time</p>
              </div>
            </div>
            {/* Scholarship Level */}
            <div>
              <p className="font-bold text-white">Scholarship Level</p>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Bachelors Degree"
                  value="Bachelors Degree"
                  className=" accent-[#8E1616]"
                />
                <p>Bachelors Degree</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Masters Degree"
                  value="Masters Degree"
                  className=" accent-[#8E1616]"
                />
                <p>Masters Degree</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Post Graduate Diploma"
                  value="Post Graduate Diploma"
                  className=" accent-[#8E1616]"
                />
                <p>Post Graduate Diploma</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Doctorate Degree"
                  value="Doctorate Degree"
                  className=" accent-[#8E1616]"
                />
                <p>Doctorate Degree</p>
              </div>
            </div>
            {/* Scholarship Category */}
            <div>
              <p className="font-bold text-white">Scholarship Category</p>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Government"
                  value="Government"
                  className=" accent-[#8E1616]"
                />
                <p>Government</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Private"
                  value="Private"
                  className=" accent-[#8E1616]"
                />
                <p>Private</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Organizational"
                  value="Organizational"
                  className=" accent-[#8E1616]"
                />
                <p>Organizational</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="International"
                  value="International"
                  className=" accent-[#8E1616]"
                />
                <p>International</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Research"
                  value="Research"
                  className=" accent-[#8E1616]"
                />
                <p>Research</p>
              </div>
            </div>
          </div>
          {/* jobs display*/}
          <div className="md:basis-[75%] flex flex-col gap-2">
            {/* search bar */}
            <SearchBar
              name={"scholarshipname"}
              value={searchInput.scholarshipname}
              placeholder={"Scholarship Name"}
              onChange={handleSearchInputs}
              searchFunction={searchScholarshipByName}
              setSearchResultsVerified={searchResultsVerified}
              setSearchResults={setSearchResults}
              setMessage={setMessage}
              link={"scholarship/filtersearch"}
            />

            {/* displaying scholarship */}
            {searchResultsVerified ? (
              /* if search results have been retrieved, display*/
              <div className="flex flex-col">
                {loading ? (
                  <Loading />
                ) : (
                  <div>
                    <div className="display-boxes">
                      {searchResults.length === 0
                        ? `No Scholarships for ${searchInput.scholarshipname} Found`
                        : searchResults.map((scholarship, id) => (
                            <CardElement
                              key={id}
                              description={scholarship.description}
                              scholarshipname={scholarship.scholarshipname}
                              country={scholarship.country}
                              deadline={scholarship.deadline}
                              scholarshiptype={scholarship.scholarshiptype}
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
              /* if user hasnt search for anything, display all scholarships */
              <div className="flex flex-col">
                {loading ? (
                  <Loading />
                ) : (
                  <div>
                    <div className="display-boxes">
                      {post.map((scholarship, id) => (
                        <CardElement
                          key={id}
                          description={scholarship.description}
                          scholarshipname={scholarship.scholarshipname}
                          country={scholarship.country}
                          deadline={scholarship.deadline}
                          scholarshiptype={scholarship.scholarshiptype}
                        />
                      ))}
                    </div>
                    <Pagination
                      totalPost={post.length}
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
        {/* advert */}
        <section className="flex justify-between gap-2">
          <AdvertBox image={built} />
          <AdvertBox image={government} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NewScholarship;
