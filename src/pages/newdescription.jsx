import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FaCediSign, FaRegFaceMeh } from "react-icons/fa6";
import { FaShareFromSquare } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { useState } from "react";
import image from "../assets/built.jpg";
import { IoIosArrowRoundBack } from "react-icons/io";

const AdvertCard = ({ image }) => {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className=" rounded-xl h-96 bg-contain"
    ></div>
  );
};

const CardElement = ({ overview, position, location, salary, datecreated }) => {
  return (
    <div className="dark:bg-[#0F141E] dark:border-slate-600 bg-white h-44 max-w-screen-xl relative rounded-md shadow-lg border border-slate-200 ">
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
    </div>
  );
};

const NewJobDescription = () => {
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
  ];

  return (
    <>
      <Header />
      <main className=" dark:bg-[#1D232A] dark:text-[#d6d8dd] p-4 min-h-[calc(100vh-312px)] relative ">
        <section className="flex justify-between p-4">
          {/* left sidebar */}
          <div className="hidden md:flex md:flex-col w-56  rounded-xl basis-[20%] gap-2 sticky top-20 p-4">
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
          {/* description display*/}
          <div className=" basis-full md:basis-[55%] flex flex-col gap-2">
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
            {/* heading */}
            <div className="h-28 p-4 rounded-t-2xl">
              <div className="flex gap-2">
                <div className=" h-20 w-20 dark:bg-[#0F141E] dark:border-slate-600 bg-white border "></div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold dark:text-white">
                    Company Name
                  </h1>
                  <small className="mb-2">Location</small>
                  <small className=" dark:bg-[#0F141E] bg-white rounded-lg w-20 px-1 ">
                    Category
                  </small>
                </div>
              </div>
            </div>
            {/* Description */}
            <div className=" p-4 rounded-t-2xl flex flex-col gap-4 ">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xl font-bold dark:text-white">
                    Software Developer
                  </h1>
                  <div>
                    <p className="font-bold dark:text-white">Company Name</p>
                    <small>Location</small>
                  </div>
                  <small>Job Type: Full Time</small>
                </div>
                <div className="hidden md:flex flex-col">
                  <small>Posted On:</small>
                  <button className="dark:bg-[#0F141E] bg-red-500 w-full p-2 text-slate-200 rounded-xl ">
                    Apply Now
                  </button>
                </div>
              </div>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
                cumque. Repellat, cupiditate repellendus. Dolorum ad ut illum
                quo consequatur deleniti minus ducimus nam magni, totam corrupti
                et, aperiam accusamus animi! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Velit, cumque. Repellat,
                cupiditate repellendus. Dolorum ad ut illum quo consequatur
                deleniti minus ducimus nam magni, t Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Velit, cumque. Repellat,
                cupiditate repellendus. Dolorum ad ut illum quo consequatur
                deleniti minus ducimus nam magni, totam corrupti et, aperiam
                accusamus animi!otam corrupti et, aperiam accusamus animi!
              </p>
            </div>
          </div>
          {/* right sidebar*/}
          <div className="md:basis-[20%] flex flex-col bg-contain gap-2  rounded-xl ">
            <AdvertCard image={image} />
            <AdvertCard image={image} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NewJobDescription;
