import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState, useRef } from "react";
import { fetch, BASE_URL } from "./request";
import government from "../assets/government.jpg";
import built from "../assets/built.jpg";
import AdvertBox from "../components/Advert/advertBox";
import Pagination from "../components/Pagination/Pagination";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import SearchBar from "../components/searchBar";
import CheckBoxFilter from "../components/checkBoxFilter";
import CardElement from "../components/cardElement";
import { GoTrophy } from "react-icons/go";
import { CiClock2 } from "react-icons/ci";

const NewScholarship = () => {
  const [scholarships, setScholarship] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPerPage, setPostPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsVerified, setSearchResultsVerified] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("scholarship", setScholarship, setLoading, signal, setMessage);
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
      setLoading(false);
      setSearchResults(response.data.data);
    } catch (error) {
      setLoading(true);
      setMessage(error.response.data.message);
    }
  };
  const [filters, setFilters] = useState({
    scholarshiptype: [],
    programs: [],
    scholarshipcategory: [],
  });
  const handleFilterChange = async (e) => {
    const { name, value, checked } = e.target;
    // Update filters state
    const filterType =
      name === "Fully Funded" || name === "Partially Funded"
        ? "scholarshiptype"
        : name === "Bachelors Degree" ||
          name === "Masters Degree" ||
          name === "Post Graduate Diploma" ||
          name === "Doctorate Degree"
        ? "programs"
        : "scholarshipcategory";
    const updatedFilters = { ...filters };
    if (checked) {
      updatedFilters[filterType] = [...updatedFilters[filterType], value];
    } else {
      updatedFilters[filterType] = updatedFilters[filterType].filter(
        (item) => item !== value
      );
    }
    // Update state AND use the updated value immediately
    setFilters(updatedFilters);
    try {
      const response = await axios.post(
        `${BASE_URL}/scholarship/checkboxfilter`,
        updatedFilters
      );
      setSearchResultsVerified(true);
      setLoading(false);
      setSearchResults(response.data.data);
    } catch (error) {
      setLoading(true);
      setMessage(error.response.data.message);
    }
  };
  const resetFilters = async () => {
    try {
      // 1. Reset all filters to empty arrays
      setFilters({
        scholarshiptype: [],
        programs: [],
        scholarshipcategory: [],
      });
      // 2. Fetch fresh data from server
      const response = await axios.get(`${BASE_URL}/scholarship`);
      setSearchResultsVerified(true);
      setSearchResults(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      setMessage("Failed to reset filters");
    }
  };

  const lastPageIndex = currentPage * postPerPage;
  const firstPageIndex = lastPageIndex - postPerPage;
  const post = scholarships.slice(firstPageIndex, lastPageIndex);

  const [subscribeState, setSubscribeState] = useState(false);
  const toggleSubscribe = () => {
    setSubscribeState((prev) => !prev);
  };
  return (
    <>
      <Header toggleSubscribe={toggleSubscribe} />
      {/* text animation */}
      <aside className=" h-[4rem] flex items-center relative bg-gradient-to-r from-cyan-500 to-blue-500 m-auto ">
        <div className="m-auto p-4 md:p-0 md:max-w-5xl w-full text-2xl md:text-4xl font-medium text-white">
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
        <img
          src={government}
          loading="lazy"
          className=" h-32 w-full object-cover"
        />
      </section>
      <main className="bg-[#1D232A] text-[#d6d8dd] p-4 bg-cover min-h-[calc(100vh-312px)] relative ">
        <section className="flex justify-between p-4">
          {/* side bar */}
          <div className="hidden md:flex md:flex-col h-fit w-56 border border-slate-400 rounded-xl basis-[20%] gap-2 sticky top-32 p-4 motion-translate-y-in-100">
            {/* heading */}
            <div className="flex justify-between">
              <h1>Filter</h1>
              <p
                onClick={resetFilters}
                className="hover:text-red-500 hover:underline cursor-pointer"
              >
                Reset
              </p>
            </div>
            {/* Scholarship Type */}
            <div>
              <p className="font-bold text-white">Scholarship Type</p>
              <CheckBoxFilter
                name={"Fully Funded"}
                value={"Fully Funded"}
                onChange={handleFilterChange}
                filterGroup="scholarshiptype"
                filters={filters}
              />
              <CheckBoxFilter
                name={"Partially Funded"}
                value={"Partially Funded"}
                onChange={handleFilterChange}
                filterGroup="scholarshiptype"
                filters={filters}
              />
            </div>
            {/* Scholarship Level */}
            <div>
              <p className="font-bold text-white">Scholarship Level</p>
              <CheckBoxFilter
                name={"All Levels"}
                value={"All Levels"}
                onChange={handleFilterChange}
                filterGroup="programs"
                filters={filters}
              />
              <CheckBoxFilter
                name={"Bachelors Degree"}
                value={"Bachelors Degree"}
                onChange={handleFilterChange}
                filterGroup="programs"
                filters={filters}
              />
              <CheckBoxFilter
                name={"Masters Degree"}
                value={"Masters Degree"}
                onChange={handleFilterChange}
                filterGroup="programs"
                filters={filters}
              />
              <CheckBoxFilter
                name={"Post Graduate Diploma"}
                value={"Post Graduate Diploma"}
                onChange={handleFilterChange}
                filterGroup="programs"
                filters={filters}
              />
              <CheckBoxFilter
                name={"Doctorate Degree"}
                value={"Doctorate Degree"}
                onChange={handleFilterChange}
                filterGroup="programs"
                filters={filters}
              />
            </div>
            {/* Scholarship Category */}
            <div>
              <p className="font-bold text-white">Scholarship Category</p>
              <CheckBoxFilter
                name={"Government"}
                value={"Government"}
                onChange={handleFilterChange}
                filterGroup="scholarshipcategory"
                filters={filters}
              />
              <CheckBoxFilter
                name={"Private"}
                value={"Private"}
                onChange={handleFilterChange}
                filterGroup="scholarshipcategory"
                filters={filters}
              />
              <CheckBoxFilter
                name={"Organizational"}
                value={"Organizational"}
                onChange={handleFilterChange}
                filterGroup="scholarshipcategory"
                filters={filters}
              />
              <CheckBoxFilter
                name={"International"}
                value={"International"}
                onChange={handleFilterChange}
                filterGroup="scholarshipcategory"
                filters={filters}
              />
              <CheckBoxFilter
                name={"Research"}
                value={"Research"}
                onChange={handleFilterChange}
                filterGroup="scholarshipcategory"
                filters={filters}
              />
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
                              postionOrScholarshipName={
                                scholarship.scholarshipname
                              }
                              descriptionOrOverview={scholarship.description}
                              companyOrScholarshipName={
                                scholarship.scholarshipname
                              }
                              countryOrLocation={scholarship.country}
                              salaryOrDeadline={scholarship.deadline}
                              scholarshiptypeOrDateCreated={
                                scholarship.scholarshiptype
                              }
                              cediOrClock={<CiClock2 />}
                              clockOrTrophy={<GoTrophy />}
                              link={`/newscholarship/${scholarship.id}`}
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
                          postionOrScholarshipName={scholarship.scholarshipname}
                          descriptionOrOverview={scholarship.description}
                          companyOrScholarshipName={scholarship.scholarshipname}
                          countryOrLocation={scholarship.country}
                          salaryOrDeadline={scholarship.deadline}
                          scholarshiptypeOrDateCreated={
                            scholarship.scholarshiptype
                          }
                          cediOrClock={<CiClock2 />}
                          clockOrTrophy={<GoTrophy />}
                          link={`/newscholarship/${scholarship.id}`}
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
