import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FaCediSign, FaRegFaceMeh } from "react-icons/fa6";
import { FaShareFromSquare } from "react-icons/fa6";
import { CiClock2 } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import image from "../assets/built.jpg";
import international from "../assets/international.jpg";
import AdvertBox from "../components/Advert/advertBox";
import DescriptionTemplate from "../components/descriptionTemplate";
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
  const desc = [
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
  ];

  return (
    <>
      <Header />
      <aside
        style={{ backgroundImage: `url(${international})` }}
        className="h-56 w-full bg-red-400 relative"
      >
        <div className="absolute h-full w-full grid place-content-center bg-black/30">
          <p className="text-white text-xlshadow-md md:text-3xl">
            International Scholarship
          </p>
        </div>
      </aside>
      <main className=" bg-[#1D232A] text-[#d6d8dd] md:p-4 min-h-[calc(100vh-312px)] relative flex flex-col">
        <section className="flex justify-between md:p-4">
          {/* left sidebar */}
          <div className="hidden md:flex md:flex-col w-56  rounded-xl basis-[20%] gap-2 sticky top-20 p-4 motion-translate-x-in-25">
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
            {desc.map((job) => (
              <DescriptionTemplate
                image={international}
                imageAlt={job.company.substring(0, 2)}
                location={job.location}
                category={job.jobcategory}
                companyNameOrScholarshipTitle={job.company}
                jobOrScholarhipTitle={job.position}
                jobDurationOrScholarshipType={job.duration}
                datecreated={job.datecreated}
                post={job.post}
                link={"/scholarship"}
              />
            ))}
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

export default NewJobDescription;
