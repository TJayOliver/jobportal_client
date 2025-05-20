import { CiSearch } from "react-icons/ci";
import { FaCediSign, FaRegFaceMeh } from "react-icons/fa6";
import { FaShareFromSquare } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart, IoFilter } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { fetch, BASE_URL } from "./request";
import ClickSpark from "../components/clickSpark";
import { MdArrowForward } from "react-icons/md";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const CardElement = ({ overview, position, location, salary, datecreated }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className="bg-[#0F141E] border-slate-600 h-60 max-w-screen-xl relative rounded-md shadow-lg border ">
      {/* image,location,title,share */}
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-1">
          <div className="h-9 w-9 rounded-full shrink-0 flex bg-[#2d2e32]"></div>
          <div className="flex flex-col">
            <h1 className="text-sm dark:text-white">{position}</h1>
            <p className="text-sm dark:text-white">{location}</p>
          </div>
        </div>
        {/* share */}
        <FaShareFromSquare />
      </div>
      {/* short description */}
      <div className="px-4">
        <p className=" text-sm">{overview}..</p>
        <hr className="mt-2"></hr>
      </div>
      {/* salary,date posted */}
      <div className="flex items-center justify-between p-4">
        <div className="text-[12px] flex items-center">
          <FaCediSign /> <p>{salary}</p>
        </div>
        <div className="flex items-center text-[12px] gap-1">
          <CiClock2 /> {datecreated}
        </div>
      </div>
      {/* buttons */}
      <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 gap-1 flex justify-between items-center">
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <button
            onMouseEnter={() => setOnMouseEnter(true)}
            onMouseLeave={() => setOnMouseEnter(false)}
            className="bg-gradient-to-r flex justify-center h-10 items-center  from-[#641B2E] to-[#3a111c]  w-full p-2 text-slate-200 rounded-xl"
          >
            {onMouseEnter ? (
              <MdArrowForward className="duration-100 ease-in" />
            ) : (
              <p className="duration-100 ease-in">Apply</p>
            )}
          </button>
        </ClickSpark>

        <div
          onClick={toggleLike}
          className="rounded-lg h-10 w-12 border border-slate-300 flex items-center justify-center cursor-pointer"
        >
          {isLiked ? <IoHeart size={20} /> : <IoMdHeartEmpty size={20} />}
        </div>
      </div>
    </div>
  );
};

const NewJobs = () => {
  const categories = [
    { id: 1, categoryname: "Healthcare & Medical Services" },
    { id: 2, categoryname: "Information Technology" },
    { id: 3, categoryname: "Engineering & Manufacturing" },
    { id: 4, categoryname: "Finance & Accounting" },
    { id: 5, categoryname: "Education & Training" },
    { id: 6, categoryname: "Marketing & Communications" },
    { id: 7, categoryname: "Hospitality & Tourism" },
    { id: 8, categoryname: "Retail & Sales" },
    { id: 9, categoryname: "Construction & Trades" },
    { id: 10, categoryname: "Legal & Compliance" },
  ];
  const job = [
    {
      id: "1",
      overview: "Responsible for diagnosing and treating patients.",
      position: "General Physician",
      image: "doctor.jpg",
      imagename: "Doctor Profile",
      salary: "100,000",
      featured: "true",
      company: "Healthcare Solutions Ltd.",
      website: "https://healthcare-solutions.com",
      duration: "Full Time",
      location: "London, UK",
      post: "Seeking an experienced physician to join our team.",
      author: "John Doe",
      jobcategory: "Healthcare & Medical Services",
      datecreated: "21/05/2025",
    },
    {
      id: "2",
      overview: "Develop and maintain software applications.",
      position: "Software Engineer",
      image: "software_engineer.jpg",
      imagename: "Software Engineer",
      salary: "85,000",
      featured: "false",
      company: "Tech Innovations Inc.",
      website: "https://techinnovations.com",
      duration: "Full Time",
      location: "San Francisco, USA",
      post: "Join our team to work on cutting-edge technology.",
      author: "Jane Smith",
      jobcategory: "Information Technology (IT)",
      datecreated: "21/05/2025",
    },
    {
      id: "3",
      overview: "Oversee the planning and execution of engineering projects.",
      position: "Project Engineer",
      image: "engineer.jpg",
      imagename: "Engineer Working",
      salary: "75,000",
      featured: "true",
      company: "Global Engineering Ltd.",
      website: "https://globaleng.com",
      duration: "Full Time",
      location: "Berlin, Germany",
      post: "Looking for an experienced engineer to manage projects.",
      author: "Michael Brown",
      jobcategory: "Engineering & Manufacturing",
      datecreated: "21/05/2025",
    },
    {
      id: "4",
      overview: "Analyze financial statements and reports.",
      position: "Financial Analyst",
      image: "finance.jpg",
      imagename: "Finance Reports",
      salary: "90,000",
      featured: "false",
      company: "Finance Experts LLC",
      website: "https://financeexperts.com",
      duration: "Full Time",
      location: "New York, USA",
      post: "Seeking a detail-oriented financial analyst.",
      author: "Emily White",
      jobcategory: "Finance & Accounting",
      datecreated: "21/05/2025",
    },
    {
      id: "5",
      overview: "Teach courses to students at a university level.",
      position: "Professor of Mathematics",
      image: "professor.jpg",
      imagename: "University Lecturer",
      salary: "80,000",
      featured: "true",
      company: "Oxford University",
      website: "https://oxford.ac.uk",
      duration: "Full Time",
      location: "Oxford, UK",
      post: "Seeking a mathematics professor with teaching experience.",
      author: "William Green",
      jobcategory: "Education & Training",
      datecreated: "21/05/2025",
    },
    {
      id: "6",
      overview: "Create marketing strategies and campaigns.",
      position: "Marketing Manager",
      image: "marketing.jpg",
      imagename: "Marketing Strategy",
      salary: "70,000",
      featured: "false",
      company: "Brand Solutions Ltd.",
      website: "https://brandsolutions.com",
      duration: "Full Time",
      location: "Paris, France",
      post: "Hiring a marketing expert to lead our campaigns.",
      author: "Sarah Johnson",
      jobcategory: "Marketing & Communications",
      datecreated: "21/05/2025",
    },
    {
      id: "7",
      overview: "Manage hotel operations and guest experiences.",
      position: "Hotel Manager",
      image: "hotel.jpg",
      imagename: "Luxury Hotel",
      salary: "65,000",
      featured: "true",
      company: "Grand Hotels Worldwide",
      website: "https://grandhotels.com",
      duration: "Full Time",
      location: "Dubai, UAE",
      post: "Seeking a hospitality professional to manage operations.",
      author: "Robert Wilson",
      jobcategory: "Hospitality & Tourism",
      datecreated: "21/05/2025",
    },
    {
      id: "8",
      overview: "Manage retail store operations and sales strategies.",
      position: "Store Manager",
      image: "retail.jpg",
      imagename: "Retail Store",
      salary: "50,000",
      featured: "false",
      company: "Retail Experts Inc.",
      website: "https://retailexperts.com",
      duration: "Full Time",
      location: "Toronto, Canada",
      post: "Looking for an experienced store manager.",
      author: "Anna Scott",
      jobcategory: "Retail & Sales",
      datecreated: "21/05/2025",
    },
    {
      id: "9",
      overview: "Manage construction projects and teams.",
      position: "Construction Supervisor",
      image: "construction.jpg",
      imagename: "Construction Site",
      salary: "60,000",
      featured: "true",
      company: "BuildRight Ltd.",
      website: "https://buildright.com",
      duration: "Full Time",
      location: "Sydney, Australia",
      post: "Hiring a skilled supervisor for ongoing construction projects.",
      author: "Daniel Lee",
      jobcategory: "Construction & Trades",
      datecreated: "21/05/2025",
    },
    {
      id: "10",
      overview: "Provide legal advice and support.",
      position: "Legal Advisor",
      image: "legal.jpg",
      imagename: "Courtroom",
      salary: "95,000",
      featured: "false",
      company: "Law Firm Associates",
      website: "https://lawfirmassociates.com",
      duration: "Full Time",
      location: "Washington, USA",
      post: "Seeking a skilled legal advisor with corporate experience.",
      author: "Laura Martinez",
      jobcategory: "Legal & Compliance",
      datecreated: "21/05/2025",
    },
  ];
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const inputRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible]);

  return (
    <>
      <Header />

      <main className=" bg-[#1D232A] text-[#d6d8dd] p-4 min-h-[calc(100vh-312px)] relative">
        <section className="flex justify-between p-4">
          {/* side bar */}
          <div className="hidden md:flex md:flex-col h-[32rem] w-56 border border-slate-400 rounded-xl basis-[20%] gap-2 sticky top-32 p-4">
            {/* heading */}
            <div className="flex justify-between">
              <h1>Filter</h1>
              <p className="hover:text-red-500 hover:underline cursor-pointer">
                Reset
              </p>
            </div>
            {/* Work Schedule */}
            <div>
              <p className="font-bold">Work Schedule</p>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Part Time"
                  value="Part Time"
                  className=" accent-[#8E1616]"
                />
                <p>Part Time</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  name="Part Time"
                  value="Part Time"
                  className=" accent-[#8E1616]"
                />
                <p>Full Time</p>
              </div>
            </div>
            {/* category */}
            <div>
              <p className="font-bold">Category</p>
              {categories.map((category, id) => (
                <div key={id} className="flex gap-1">
                  <input
                    type="checkbox"
                    name="Part Time"
                    value={category.categoryname}
                    className=" accent-[#8E1616]"
                  />
                  <p>{category.categoryname}</p>
                </div>
              ))}
            </div>
          </div>
          {/* jobs display*/}
          <div className="md:basis-[75%] flex flex-col gap-2">
            {/* search bar */}
            <div className="flex justify-between items-center gap-2">
              <div
                onClick={toggleSearch}
                className="rounded-full h-10 w-10 border border-slate-300 flex items-center justify-center"
              >
                <CiSearch size={20} className="text-white" />
              </div>

              <input
                ref={inputRef}
                type="search"
                placeholder="Job Title"
                className={`text-black border placeholder:text-sm placeholder:text-slate-400 px-2 border-slate-300 rounded-3xl p-1 outline-none transition-all duration-300 ease-in-out ${
                  isSearchVisible ? "w-full opacity-100" : "w-0 opacity-0 "
                }`}
              />
              <div className="rounded-3xl border border-slate-300 p-2 flex justify-between items-center gap-1">
                <IoFilter />
                <p>Recent</p>
              </div>
            </div>
            {/* displaying jobs */}
            <div className="flex flex-col md:grid md:grid-cols-4 gap-4 ">
              {job.map((job, id) => (
                <CardElement
                  key={id}
                  overview={job.overview.substring(0, 50)}
                  position={job.position}
                  location={job.location}
                  salary={job.salary}
                  datecreated={job.datecreated}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NewJobs;
