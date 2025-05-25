import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import image from "../assets/built.jpg";
import international from "../assets/international.jpg";
import government from "../assets/government.jpg";
import organizational from "../assets/organizational.png";
import privates from "../assets/private.jpg";
import research from "../assets/research.jpg";
import AdvertBox from "../components/Advert/advertBox";
import DescriptionTemplate from "../components/descriptionTemplate";
import Loading from "../components/Loading/Loading";
import axios from "axios";
import { fetch, fetchByID } from "./request";
import DescriptionCardElement from "../components/descriptionCardElement";
import { use } from "react";

const AdvertCard = ({ image }) => {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className=" rounded-xl h-96 bg-contain"
    ></div>
  );
};

const NewScholarshipDescription = () => {
  axios.defaults.withCredentials = true;
  const params = useParams();
  const id = params.id;

  const [scholarship, setScholarship] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [scholarshipCategory, setScholarshipCategory] = useState(null);
  const [relatedScholarshipByCategory, setRelatedScholarshipByCategory] =
    useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchByID(
      "scholarship/read",
      id,
      setScholarship,
      setLoading,
      setMessage,
      signal
    );
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (scholarship.length) {
      scholarship.map((scholarship) => {
        setScholarshipCategory(scholarship.scholarshipcategory);
      });
    }
    if (scholarshipCategory !== null) {
      const controller = new AbortController();
      const signal = controller.signal;
      fetch(
        `scholarship/category/${scholarshipCategory}`,
        setRelatedScholarshipByCategory,
        setLoading,
        signal,
        setMessage
      );
      return () => controller.abort();
    }
  }, [scholarship]);

  return (
    <>
      <Header />
      <aside
        style={{
          backgroundImage: `url(${
            scholarshipCategory === "International"
              ? international
              : scholarshipCategory === "Private"
              ? privates
              : scholarshipCategory === "Organizational"
              ? organizational
              : scholarshipCategory === "Research"
              ? research
              : scholarshipCategory === "Government"
              ? government
              : null
          })`,
        }}
        className="h-56 w-full bg-red-400 relative bg-contain"
      >
        <div className="absolute h-full w-full grid place-content-center bg-black/30">
          <p className="text-white text-xlshadow-md md:text-3xl">
            {scholarshipCategory === "International"
              ? "International Scholarship"
              : scholarshipCategory === "Private"
              ? "Private Scholarship"
              : scholarshipCategory === "Organizational"
              ? "Organizational Scholarship"
              : scholarshipCategory === "Research"
              ? "Research Scholarship"
              : scholarshipCategory === "Government"
              ? "Government Scholarship"
              : ""}
          </p>
        </div>
      </aside>
      <main className=" bg-[#1D232A] text-[#d6d8dd] md:p-4 min-h-[calc(100vh-312px)] relative flex flex-col">
        <section className="flex justify-between md:p-4">
          {/* left sidebar */}
          <div className="hidden md:flex md:flex-col w-56 rounded-xl basis-[20%] gap-2 sticky top-20 p-4 motion-translate-x-in-25">
            {loading ? (
              <Loading />
            ) : (
              <div className="flex flex-col gap-3">
                {relatedScholarshipByCategory.map((scholarship) => (
                  <DescriptionCardElement
                    key={scholarship.id}
                    descriptionOrOverview={scholarship.description.substring(
                      0,
                      50
                    )}
                    postionOrScholarshipName={scholarship.scholarshipname}
                    countryOrLocation={scholarship.country}
                    salaryOrDeadline={scholarship.deadline}
                    scholarshiptypeOrDateCreated={scholarship.scholarshiptype}
                  />
                ))}
              </div>
            )}
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
            {loading ? (
              <Loading />
            ) : (
              <div>
                {scholarship.map((scholarship) => (
                  <DescriptionTemplate
                    key={scholarship.id}
                    image={scholarship.image}
                    imageAlt={scholarship.scholarshipname.substring(0, 2)}
                    location={scholarship.country}
                    category={scholarship.scholarshipcategory}
                    companyNameOrScholarshipTitle={scholarship.scholarshipname}
                    jobOrScholarhipTitle={scholarship.scholarshipname}
                    jobDurationOrScholarshipType={scholarship.duration}
                    datecreated={scholarship.datecreated}
                    post={scholarship.post}
                    link={scholarship.website}
                  />
                ))}
              </div>
            )}
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

export default NewScholarshipDescription;
