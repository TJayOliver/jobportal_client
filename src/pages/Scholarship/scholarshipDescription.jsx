/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SocialMedia from "../../components/Homepage/SocialMedia/SocialMedia";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useState, useEffect } from "react";
import { fetch, fetchByID, CLIENT_URL } from "../request";
import parser from "html-react-parser";
import Platforms from "../../components/Platforms/Platforms";
import Subscribe from "../../components/Subscribe/Subscribe";
import { BsCalendar2, BsPeople } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import megaphone from "../../assets/megaphone.png";
import image from "../../assets/student1.jpg";
//import Cookie from "../../components/Cookie/Cookie";
import axios from "axios";
import moment from "moment";
import Share from "../../components/Share/Share";
import { Helmet } from "react-helmet-async";

const RelatedBox = ({ image, scholarshipname, location, agent, deadline, programs, to }) => {
  return (
    <div className=" rounded-lg border border-gray-100 p-4 flex flex-col gap-2 bg-slate-50">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <img src={`${image}`} loading="lazy" className="rounded-full w-14 h-14" />
          <div>
            <p className="font-bold">{scholarshipname}</p>
            <small>{location}</small>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <BsPeople />
          <p>{agent} Required</p>
        </div>
        <div className="flex items-center gap-1">
          <BsCalendar2 />
          <p>Apply Before {moment(deadline).format("YYYY-MM-DD")}</p>
        </div>
        <div className="flex items-center gap-1">
          <BiSolidCategory />
          <p>{programs}</p>
        </div>
      </div>
      <a
        href={to}
        className="bg-blue-500 hover:bg-blue-600 rounded-lg p-2 flex justify-center font-bold text-white"
      >
        Apply
      </a>
    </div>
  );
};

const ScholarshipDescription = () => {
  const params = useParams();
  const id = params.id;

  const [scholarship, setScholarship] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [cookieTracker, setCookieTracker] = useState(null);

  const [similar, setSimilar] = useState([]);

  axios.defaults.withCredentials = true;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [headImage, setHeadImage] = useState("");

  useEffect(() => {
    if (scholarship.length > 0) {
      const scholarships = scholarship[0];
      setTitle(scholarships.scholarshipname);
      setDescription(scholarships.description);
      setHeadImage(`${scholarships.image}`);
    }
  }, [scholarship]);

  const stripHtmlTags = (htmlString) => {
    return htmlString.replace(/(<([^>]+)>)/gi, "");
  };

  const desc = stripHtmlTags(description);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchByID(
      "scholarship/read",
      id,
      setScholarship,
      setLoading,
      setMessage,
      signal,
      setCookieTracker
    );
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      const countryPromises = scholarship.map(async (count) => count.country);
      const [countryname] = await Promise.all(countryPromises);
      try {
        await fetch(`scholarship/country/${countryname}`, setSimilar, setLoading, signal);
        return () => controller.abort();
      } catch (error) {
        console.error(error.message);
      }
    };

    if (!loading) {
      // Only fetch data when loading is false
      fetchData();
    }
  }, [scholarship, loading]);

  const [SubscribeState, SetSubscribeState] = useState(false);
  const url = `${CLIENT_URL}/scholarship/${id}`;
  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Future Forte" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="article:publisher" content={url} />
        <meta property="og:image" content={headImage} />
        <meta property="og:image:secure_url" content={headImage} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={headImage} />
        <meta name="twitter:url" content={url} />
      </Helmet>

      <Header />
      <Subscribe SubscribeState={SubscribeState} SetSubscribeState={SetSubscribeState} />
      <aside className="h-64">
        <img src={image} loading="lazy" className="h-full w-full object-cover" />
      </aside>

      <main className="relative flex p-2 justify-between gap-4">
        {/* Descriptions */}
        <section className="flex flex-col w-full -translate-y-14">
          <section className="flex flex-col gap-3">
            {/* name and share */}
            <section
              id="description"
              className="w-full max-w-5xl m-auto flex flex-col bg-white rounded-lg p-8 gap-3 border border-gray-100"
            >
              {/* scholarship image and share button*/}
              <div className="flex justify-between items-center">
                {loading ? (
                  <Loading />
                ) : (
                  scholarship.map((list, id) => (
                    <img
                      key={id}
                      loading="lazy"
                      src={`${list.image}`}
                      className="rounded-full h-24 w-24 object-cover"
                    />
                  ))
                )}
                {/* share */}
                <div className="flex gap-1 items-center">
                  <Share url={url} title={title} description={description} />
                </div>
              </div>

              {loading ? (
                <Loading />
              ) : (
                scholarship.map((list, id) => (
                  <div key={id} id="name/location">
                    <h1 className="text-2xl font-bold">{list.scholarshipname}</h1>
                    <small className="font-medium">{list.country}</small>
                  </div>
                ))
              )}
              {loading ? (
                <Loading />
              ) : (
                scholarship.map((list, id) => (
                  <div key={id} className="text-justify">
                    {parser(`${list.description}`)}
                  </div>
                ))
              )}
            </section>

            {/* minimum information */}
            <section className="h-20 border border-gray-100 flex  m-auto p-8 rounded-lg py-14 gap-4 divide-x-2 max-w-5xl items-center justify-between w-full text-sm md:text-md">
              <div>
                <div className="flex items-center gap-1">
                  <BsPeople />
                  <p className="font-bold">Agent</p>
                </div>
                {loading ? (
                  <Loading />
                ) : (
                  scholarship.map((list, id) => <p key={id}>{list.agent} Required</p>)
                )}
              </div>
              <div className="p-2">
                <div className="flex items-center gap-1">
                  <BsCalendar2 />
                  <p className="font-bold">Deadline</p>
                </div>
                {loading ? (
                  <Loading />
                ) : (
                  scholarship.map((list, id) => (
                    <p key={id}>{moment(list.deadline).format("YYYY-MM-DD")}</p>
                  ))
                )}
              </div>
              <div className="p-2">
                <div className="flex items-center gap-1">
                  <BiSolidCategory />
                  <p className="font-bold">Programs Offered</p>
                </div>
                {loading ? (
                  <Loading />
                ) : (
                  scholarship.map((list, id) => <p key={id}>{list.programs}</p>)
                )}
              </div>
            </section>

            {/* scholarship information  */}
            <section
              id="scholarship information"
              className="w-full max-w-5xl m-auto flex flex-col bg-white rounded-lg p-8 gap-3 text-justify"
            >
              {loading ? (
                <Loading />
              ) : (
                scholarship.map((post, id) => <section key={id}>{parser(post.post)}</section>)
              )}
            </section>
          </section>
        </section>

        {/* Related Scholarships */}
        <section className=" hidden py-2 md:block h-[76rem] overflow-y-scroll basis-[25%]">
          <h1 className="font-bold text-xl mb-2">Related Scholarships</h1>
          {loading ? (
            <Loading />
          ) : (
            similar.map((list, id) => (
              <RelatedBox
                key={id}
                image={list.image}
                scholarshipname={list.scholarshipname}
                location={list.location}
                agent={list.agent}
                deadline={list.deadline}
                programs={list.programs}
                to={`/scholarship/${list.id}`}
              />
            ))
          )}
        </section>
      </main>

      {/* subscribe */}
      <aside className="p-3">
        <div className="flex justify-between p-2 bg-gradient-to-tr from-blue-500 to-teal-500 items-center rounded-md mt-1 mb-2 max-w-6xl m-auto">
          <div className="text-white">
            <p className=" text-xl md:text-3xl font-medium">Job Alert E-mails </p>
            <small>
              Keep track of positions that you are interested in by signing up for job alert emails
            </small>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-white/90 to-white flex flex-col items-center justify-center gap-4 h-48 w-44 p-1">
            <img src={megaphone} className=" object-cover h-32" loading="lazy" />
            <button
              onClick={() => SetSubscribeState(true)}
              className="p-2 bg-gradient-to-tr from-blue-500 to-teal-500 w-full text-sm whitespace-nowrap rounded-md text-white font-medium"
            >
              Notify Me
            </button>
          </div>
        </div>
      </aside>

      <Platforms />
      <SocialMedia />
      {/* {cookieTracker ? <Cookie /> : null} */}
      <Footer onClick={() => SetSubscribeState(true)} />
    </>
  );
};

export default ScholarshipDescription;
