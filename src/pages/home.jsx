import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import SocialMedia from "../components/Homepage/SocialMedia/SocialMedia.jsx";
import Offer from "../components/Homepage/Offer/offer.jsx";
import BrowseJobs from "../components/Homepage/BrowseJobs/BrowseJobs.jsx";
import ScholarshipPossibility from "../components/Homepage/ScholarshipPossibility/ScholarshipPossibility.jsx";
import Featured from "../components/Homepage/Featured/Featured.jsx";
import Testimonials from "../components/Homepage/Testimonials/Testimonials.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <BrowseJobs />
      <Featured />
      <ScholarshipPossibility />
      <Offer />
      <Testimonials />
      <SocialMedia />
      <Footer />
    </>
  );
}
