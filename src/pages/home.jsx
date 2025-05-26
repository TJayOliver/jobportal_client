import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Featured from "../components/Homepage/Featured/Featured.jsx";
import { useState } from "react";
import Subscribe from "../components/Subscribe/Subscribe.jsx";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const [SubscribeState, SetSubscribeState] = useState(false);
  return (
    <>
      <Header />
      <Subscribe
        SubscribeState={SubscribeState}
        SetSubscribeState={SetSubscribeState}
      />
      <Featured />
      <Footer />
    </>
  );
}
