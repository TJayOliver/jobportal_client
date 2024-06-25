import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import SocialMedia from "../components/Homepage/SocialMedia/SocialMedia.jsx";
import Offer from "../components/Homepage/Offer/Offer.jsx";
import BrowseJobs from "../components/Homepage/BrowseJobs/BrowseJobs.jsx";
import ScholarshipPossibility from "../components/Homepage/ScholarshipPossibility/ScholarshipPossibility.jsx";
import Featured from "../components/Homepage/Featured/Featured.jsx";
import Testimonials from "../components/Homepage/Testimonials/Testimonials.jsx";
import { useState } from "react";
import Subscribe from "../components/Subscribe/Subscribe.jsx";
import Platforms from "../components/Platforms/Platforms.jsx";
import logo from "../assets/logo.png";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const [SubscribeState, SetSubscribeState] = useState(false);
  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Future Forte" />
        <meta property="og:title" content="Jobs, Scholarships & Career Guidance" />
        <meta
          property="og:description"
          content="Future Forte is a platform dedicated to connecting, graduates, students and job seekers with opportunities for graduate jobs, internships, scholarships and informative articles. Future Forte is the fastest way to search for Jobs from top companies, get the latest Scholarships and read articles on Jobs and Scholarship."
        />
        <meta property="og:url" content="https://futureforte.netlify.app" />
        <meta property="og:type" content="article" />
        <meta property="article:publisher" content="https://futureforte.netlify.app" />
        <meta property="og:image" content={logo} />
        <meta property="og:image:secure_url" content={logo} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jobs, Scholarships & Career Guidance" />
        <meta
          name="twitter:description"
          content="Future Forte is a platform dedicated to connecting, graduates, students and job seekers with opportunities for graduate jobs, internships, scholarships and informative articles. Future Forte is the fastest way to search for Jobs from top companies, get the latest Scholarships and read articles on Jobs and Scholarship."
        />
        <meta name="twitter:image" content={logo} />
        <meta name="twitter:url" content="https://futureforte.netlify.app" />
      </Helmet>

      <Header />
      <Subscribe SubscribeState={SubscribeState} SetSubscribeState={SetSubscribeState} />
      <BrowseJobs />
      <Featured />
      <ScholarshipPossibility />
      <Offer />
      <Testimonials />
      <SocialMedia />
      <Platforms />
      <Footer onClick={() => SetSubscribeState(true)} />
    </>
  );
}
