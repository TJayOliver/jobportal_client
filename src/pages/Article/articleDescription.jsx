import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SocialMedia from "../../components/Homepage/SocialMedia/SocialMedia";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetch, fetchByID, BASE_URL, CLIENT_URL } from "../request";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Platforms from "../../components/Platforms/Platforms";
import Subscribe from "../../components/Subscribe/Subscribe";
import axios from "axios";
import parser from "html-react-parser";
import { LatestBox } from "./article";
import { BsFacebook, BsLinkedin, BsTwitterX } from "react-icons/bs";
import SubscribeBlueBox from "../../components/Subscribe/subscribeBlueBox";
import Cookie from "../../components/Cookie/Cookie";
import moment from "moment";
import { Helmet } from "react-helmet";
import Share from "../../components/Share/Share";

const ArticlePost = () => {
  const params = useParams();
  const id = params.id;

  const [articles, setArticles] = useState([]);
  const [authorDetails, setAuthorDetails] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [relatedArticle, setRelatedArticle] = useState([]);
  const [loading, setLoading] = useState([]);
  const [message, setMessage] = useState();
  const [cookieTracker, setCookieTracker] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchByID(
      "article/read",
      id,
      setArticles,
      setLoading,
      signal,
      setMessage,
      setCookieTracker
    );
    fetch("article/featured", setFeatured, setLoading, signal, setMessage);
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const data = async () => {
      let category = "";
      let authorname = "";
      articles.map((element) => {
        category += element.category;
        authorname += element.author;
      });
      const name = authorname;
      const controller = new AbortController();
      const signal = controller.signal;
      try {
        fetch(
          `article/category/${category}`,
          setRelatedArticle,
          setLoading,
          signal,
          setMessage
        );
        const response = await axios.post(
          `${BASE_URL}/admin/name`,
          { name },
          signal
        );
        const author = [response.data.admin];
        setAuthorDetails(author);
        return () => controller.abort();
      } catch (error) {
        console.error(error.message);
      }
    };
    if (!loading) {
      data();
    }
  }, [articles, loading]);

  const [SubscribeState, SetSubscribeState] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [headImage, setHeadImage] = useState("");

  useEffect(() => {
    if (articles.length > 0) {
      const article = articles[0];
      setTitle(article.title);
      setDescription(article.post);
      setHeadImage(`${article.image}`);
    }
  }, [articles]);

  const stripHtmlTags = (htmlString) => {
    return htmlString.replace(/(<([^>]+)>)/gi, "");
  };
  const desc = stripHtmlTags(description);
  const url = `${CLIENT_URL}/job/${id}`;

  return (
    <>
      <Helmet>
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
      <Subscribe
        SubscribeState={SubscribeState}
        SetSubscribeState={SetSubscribeState}
      />
      <main className="w-full max-w-5xl flex flex-col justify-center m-auto p-2">
        {/* heading */}
        <section className="flex flex-col gap-5">
          {loading ? (
            <Loading />
          ) : (
            articles.map((post, id) => (
              <div key={id} className="flex flex-col gap-4">
                <h1 className="text-5xl font-bold">{post.title}</h1>
              </div>
            ))
          )}
          {/* author */}
          <div className="flex justify-between items-center text-xl">
            <div className="flex gap-3 items-center">
              {/* author image */}
              {loading ? (
                <Loading />
              ) : (
                authorDetails.map((author, id) => (
                  <img
                    key={id}
                    src={`${author.image}`}
                    className="object-cover rounded-full h-14 w-14"
                  />
                ))
              )}
              {/* author name  */}
              {loading ? (
                <Loading />
              ) : (
                articles.map((post, id) => (
                  <div key={id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <small className="font-bold">{post.author}</small>
                      {authorDetails.map((author, id) => (
                        <div key={id} className="flex gap-2 text-xl">
                          <a
                            target="blank"
                            href={`https://facebook.com/${author.facebook}`}
                          >
                            <BsFacebook />
                          </a>
                          <a
                            target="blank"
                            href={`https://twitter.com/${author.twitter}`}
                          >
                            <BsTwitterX />
                          </a>
                          <a
                            target="blank"
                            href={`https://linkedin.com/${author.linkedin}`}
                          >
                            <BsLinkedin />
                          </a>
                        </div>
                      ))}
                    </div>
                    <small>
                      {" "}
                      {moment(post.datecreated).format("YYYY-MM-DD")}
                    </small>
                  </div>
                ))
              )}
            </div>
            <div>
              <Share url={url} title={title} description={description} />
            </div>
          </div>
          {/* article image */}
          <div className="h-[30rem] ">
            {articles.map((post, id) => (
              <img
                key={id}
                loading="lazy"
                src={`${post.image}`}
                className="h-full w-full object-cover"
              />
            ))}
          </div>
        </section>

        {/* post and featured */}
        <section className="flex justify-between text-justify p-4 gap-2">
          {/* related articles */}
          <div className="hidden md:block basis-[15%] border-gray-200 border-[1px] rounded-lg h-full">
            <p className="font-medium text-xl p-2">Other Articles</p>
            <div className=" border-black text-md text-left">
              {featured.map((list, id) => (
                <div
                  key={id}
                  className="hover:bg-gray-50  hover:border-l-[#22D172] p-3 hover:border-l-[1px]  duration-75 ease-in "
                >
                  <a href={`/article/${list.id}`}>{list.title}</a>
                </div>
              ))}
            </div>
          </div>

          {/* post */}
          <div className="md:basis-[80%]">
            {loading ? (
              <Loading />
            ) : (
              articles.map((post, id) => (
                <div key={id}>{parser(post.post)}</div>
              ))
            )}
          </div>
        </section>

        {/* subscription */}
        <SubscribeBlueBox onClick={() => SetSubscribeState(true)} />

        <p className="font-bold text-2xl">Related Articles</p>
        <section className="grid grid-cols-2 md:flex md:flex-wrap gap-1 md:gap-2 ">
          {loading ? (
            <Loading />
          ) : (
            relatedArticle.map((post, id) => (
              <LatestBox
                key={id}
                image={post.image}
                author={post.author}
                datecreated={moment(post.datecreated).format("YYYY-MM-DD")}
                title={post.title}
                brief={post.post.slice(0, 100)}
                category={post.category}
                to={`/article/${post.id}`}
              />
            ))
          )}
        </section>
      </main>
      <Platforms />
      <SocialMedia />
      {/* {cookieTracker ? <Cookie /> : null} */}
      <Footer onClick={() => SetSubscribeState(true)} />
    </>
  );
};

export default ArticlePost;
