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

export default function Home() {
  const [SubscribeState, SetSubscribeState] = useState(false);
  return (
    <>
      <Header />
      <Subscribe
        SubscribeState={SubscribeState}
        SetSubscribeState={SetSubscribeState}
      />
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
