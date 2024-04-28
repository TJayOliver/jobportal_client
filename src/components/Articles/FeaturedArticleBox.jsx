import main from "../../assets/cyril.jpg";
import parser from "html-react-parser";

const FeaturedArticleBox = ({ image, title, post, date, to, category }) => {
  return (
    <a
      href={to}
      className="text-white h-[27rem] md:h-96 rounded-md w-full bg-gradient-to-r from-cyan-500 to-blue-500 flex p-6 relative  duration-75 ease-out featuredArticleMove"
    >
      {/* headings */}
      <div className=" h-96 w-full flex flex-col gap-2 md:gap-8 justify-center ">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="rounded-md bg-white h-8 text-[#004242] font-medium p-3 items-center flex ">
            {category}
          </div>
          <small className="">{date}</small>
        </div>
        <div className="flex flex-col gap-8">
          <p className="font-bold text-3xl">{title}</p>
          <small>{parser(post)}</small>
        </div>
      </div>
      {/* image */}
      <div className="h-96 rounded-lg w-2/4  -translate-y-12 md:-translate-y-20 duration-75 ease-in featuredArticleImage">
        <img
          src={main}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>
    </a>
  );
};

export default FeaturedArticleBox;
