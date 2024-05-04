import Footer from "../../components/Footer/Footer";
import SocialMedia from "../../components/Homepage/SocialMedia/SocialMedia.jsx";
import { useState, useEffect } from "react";
import Subscribe from "../../components/Subscribe/Subscribe";
import Platforms from "../../components/Platforms/Platforms";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import { fetch, BASE_URL } from "../request.js";
import parser from "html-react-parser";
import Loading from "../../components/Loading/Loading";
import SubscribeBlueBox from "../../components/Subscribe/subscribeBlueBox";
import Cookie from "../../components/Cookie/Cookie";
import moment from "moment";

export const LatestBox = ({
  image,
  author,
  datecreated,
  title,
  brief,
  category,
  to,
}) => {
  return (
    <div className="h-[26rem] w-full md:w-[15rem] rounded-lg bg-white flex flex-col shrink-0">
      <img
        src={`${BASE_URL}/upload/${image}`}
        className=" h-44 rounded-t-lg object-cover w-full"
      />
      <div className="p-2 flex flex-col gap-2">
        <div className="flex gap-2">
          <small>{author}</small>
          <small>{datecreated}</small>
        </div>
        <h1 className="font-bold text-lg">
          <a className="hover:underline line-clamp-2" href={to}>
            {title}
          </a>
        </h1>
        <small className="line-clamp-3">{parser(brief)}</small>
        <small>{category}</small>
      </div>
    </div>
  );
};

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);
  const [mainfeatured, setMainFeatured] = useState([]);
  const [message, setMessage] = useState([]);
  const [cookieTracker, setCookieTracker] = useState(null);

  const [postPerPage, setPostPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(
      "article",
      setArticles,
      setLoading,
      signal,
      setMessage,
      setCookieTracker
    );
    fetch("article/featured", setFeatured, setLoading, signal, setMessage);
    fetch(
      "article/mainfeatured",
      setMainFeatured,
      setLoading,
      signal,
      setMessage
    );

    return () => controller.abort();
  }, []);

  const lastPageIndex = currentPage * postPerPage;
  const firstPageIndex = postPerPage - lastPageIndex;
  const allpost = articles.slice(firstPageIndex, lastPageIndex);

  const [SubscribeState, SetSubscribeState] = useState(false);
  const [platformsState, setPlatformsState] = useState(false);

  return (
    <>
      <Header />
      <Subscribe
        SubscribeState={SubscribeState}
        SetSubscribeState={SetSubscribeState}
      />
      <main className=" h-full ">
        <section className="max-w-5xl m-auto p-3 flex flex-col gap-2">
          {/* main featured */}
          {loading ? (
            <Loading />
          ) : (
            mainfeatured.map((post, id) => (
              <div
                key={id}
                style={{
                  backgroundImage: `url('${BASE_URL}/upload/${post.image}')`,
                }}
                className="rounded-lg h-96  object-cover bg-center flex flex-col justify-end relative"
              >
                <div className=" bg-gradient-to-tr from-black to-black/60 h-full rounded-lg opacity-70"></div>
                <div className="absolute z-50 text-white p-2 flex flex-col gap-3">
                  <small>{post.author}</small>
                  <h1 className="text-2xl font-bold">
                    <a className="hover:underline" href={`/article/${post.id}`}>
                      {post.title}
                    </a>
                  </h1>
                  <small className="text-justify line-clamp-2">
                    {parser(post.post.slice(0,50)}
                  </small>
                  <small>
                    {" "}
                    {moment(post.datecreated).format("DD-MM-YYYY")}
                  </small>
                </div>
              </div>
            ))
          )}
          {/* subscription */}
          <SubscribeBlueBox onClick={() => SetSubscribeState(true)} />

          {/* featured article */}
          <p className="font-bold text-xl md:text-2xl ">Featured Article</p>
          <div className="flex gap-3">
            {loading ? (
              <Loading />
            ) : (
              featured.map((post, id) => (
                <div
                  key={id}
                  style={{
                    backgroundImage: `url('${BASE_URL}/upload/${post.image}')`,
                  }}
                  className="h-[26rem] w-64 md:w-full rounded-lg bg-center object-cover relative flex flex-col"
                >
                  <div className=" bg-gradient-to-tr from-black to-back/50 h-[26rem] rounded-lg opacity-70"></div>
                  <div className="absolute z-20 text-white p-2 flex flex-col gap-3 bottom-0 duration-100 ease-in">
                    <small>{post.author}</small>
                    <div className="text-xl md:text-2xl font-bold">
                      <a
                        className="hover:underline line-clamp-4"
                        href={`/article/${post.id}`}
                      >
                        {post.title}
                      </a>
                    </div>
                    <small>
                      {" "}
                      {moment(post.datecreated).format("DD-MM-YYYY")}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* all articles */}
          <p className="font-bold text-xl md:text-2xl ">Latest Article</p>
          <div>
            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
              {loading ? (
                <Loading />
              ) : (
                allpost.map((post, id) => (
                  <LatestBox
                    key={id}
                    image={post.image}
                    author={post.author}
                    datecreated={moment(post.datecreated).format("DD-MM-YYYY")}
                    title={post.title}
                    brief={post.post}
                    category={post.category}
                    to={`/article/${post.id}`}
                  />
                ))
              )}
            </div>
            <Pagination
              totalPost={articles.length}
              postPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </section>
      </main>

      <Platforms
        platformsState={platformsState}
        setPlatformsState={setPlatformsState}
      />
      <SocialMedia />
      {cookieTracker ? <Cookie /> : null}
      <Footer onClick={() => SetSubscribeState(true)} />
    </>
  );
};

export default Article;
