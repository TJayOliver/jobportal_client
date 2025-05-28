import { CiClock2 } from "react-icons/ci";
import { FaCediSign } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import { fetch, BASE_URL } from "../request";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import AdvertBox from "../../components/Advert/advertBox";
import government from "../../assets/government.jpg";
import built from "../../assets/built.jpg";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import SearchBar from "../../components/searchBar";
import CheckBoxFilter from "../../components/checkBoxFilter";
import Subscribe from "../../components/Subscribe/Subscribe";
import CardElement from "../../components/cardElement";
import moment from "moment";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [postPerPage, setPostPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsVerified, setSearchResultsVerified] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("job", setJobs, setLoading, signal, setMessage);
    fetch("category", setCategories, setLoading, signal, setMessage);
    return () => controller.abort();
  }, []);
  const [searchInput, setSearchInput] = useState({ position: "" });
  const handleSearchInputs = (e) => {
    const { name, value } = e.target;
    setSearchInput((prev) => ({ ...prev, [name]: value }));
  };
  const searchJobByPosition = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/job/search`, searchInput);
      setSearchResultsVerified(true);
      setLoading(false);
      setSearchResults(response.data.data);
    } catch (error) {
      setLoading(true);
      setMessage(error.response.data.message);
    }
  };
  const [filters, setFilters] = useState({
    duration: [],
    category: [],
  });
  const handleFilterChange = async (e) => {
    const { name, value, checked } = e.target;
    // Update filters state
    const filterType =
      name === "Part Time" || name === "Full Time" ? "duration" : "category";
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
        `${BASE_URL}/job/checkboxfilter`,
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
        duration: [],
        category: [],
      });
      // 2. Fetch fresh data from server
      const response = await axios.get(`${BASE_URL}/job`);
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
  const post = jobs.slice(firstPageIndex, lastPageIndex);

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
      <main className=" bg-[#1D232A] text-[#d6d8dd] p-4 min-h-[calc(100vh-312px)] relative">
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
            {/* Work Schedule */}
            <div>
              <p className="font-bold text-white">Work Schedule</p>
              <CheckBoxFilter
                name={"Full Time"}
                value={"Full Time"}
                onChange={handleFilterChange}
                filterGroup="duration"
                filters={filters}
              />
              <CheckBoxFilter
                name={"Part Time"}
                value={"Part Time"}
                onChange={handleFilterChange}
                filterGroup="duration"
                filters={filters}
              />
            </div>
            {/* category */}
            <div>
              <p className="font-bold text-white">Category</p>
              {loading ? (
                <Loading />
              ) : (
                <div>
                  {categories.map((category, id) => (
                    <CheckBoxFilter
                      key={id}
                      name={category.categoryname}
                      value={category.categoryname}
                      onChange={handleFilterChange}
                      filterGroup="category"
                      filters={filters}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* jobs display*/}
          <div className="md:basis-[75%] flex flex-col gap-2">
            {/* search bar */}
            <SearchBar
              name={"position"}
              value={searchInput.position}
              placeholder={"Job Title"}
              onChange={handleSearchInputs}
              searchFunction={searchJobByPosition}
              setSearchResultsVerified={setSearchResultsVerified}
              setSearchResults={setSearchResults}
              setMessage={setMessage}
              setLoading={setLoading}
              link={"job/filtersearch"}
            />
            {/* displaying jobs */}
            {searchResultsVerified ? (
              /* if search results have been retrieved, display*/
              <div className="flex flex-col">
                {loading ? (
                  <Loading />
                ) : (
                  <div>
                    <div className="display-boxes">
                      {searchResults.length === 0
                        ? `No Jobs for ${searchInput.position} Found`
                        : searchResults.map((job, id) => (
                            <CardElement
                              key={job.id}
                              image={job.image}
                              descriptionOrOverview={job.overview.substring(
                                0,
                                50
                              )}
                              postionOrScholarshipName={job.position}
                              countryOrLocation={job.location}
                              salaryOrDeadline={job.salary}
                              scholarshiptypeOrDateCreated={moment(
                                job.datecreated
                              ).format("DD-MM-YYYY")}
                              cediOrClock={<FaCediSign />}
                              clockOrTrophy={<CiClock2 />}
                              companyOrScholarshipName={job.company.substring(
                                0,
                                2
                              )}
                              link={`job/${job.id}`}
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
                      {post.map((job) => (
                        <CardElement
                          key={job.id}
                          image={job.image}
                          descriptionOrOverview={job.overview.substring(0, 50)}
                          postionOrScholarshipName={job.position}
                          countryOrLocation={job.location}
                          salaryOrDeadline={job.salary}
                          scholarshiptypeOrDateCreated={moment(
                            job.datecreated
                          ).format("DD-MM-YYYY")}
                          cediOrClock={<FaCediSign />}
                          clockOrTrophy={<CiClock2 />}
                          companyOrScholarshipName={job.company.substring(0, 2)}
                          link={`job/${job.id}`}
                        />
                      ))}
                    </div>
                    <Pagination
                      totalPost={jobs.length}
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

export default Jobs;
