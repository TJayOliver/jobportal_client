import { Link } from "react-router-dom";
import image from "../../../assets/cyril.jpg";

const ScholarshipPossibility = () => {
  return (
    <section className="md:h-[28rem] p-2 flex flex-wrap-reverse justify-center gap-5 items-center ">
      <div>
        <p className=" text-4xl font-bold mb-1">
          A Step <br></br>
          <span className="bg-gradient-to-tr from-blue-500 to-teal-500 text-transparent bg-clip-text">
            Nearer To A Possibility
          </span>{" "}
          <br></br>Of A Scholarship
        </p>
        <small>
          Discover thousands of scholarships with all the details you require.
          Your moment is now!
        </small>
        <br></br>
        <Link to={"/scholarship"}>
          <p className="p-2 w-[15rem] rounded-md whitespace-nowrap bg-gradient-to-tr from-blue-500 to-teal-500 text-white hover:bg-[#024d4d]">
            Search Scholarships
          </p>
        </Link>
      </div>

      <div>
        <div className=" h-72 w-72 rounded-lg rotate-6 bg-black ">
          <img
            src={image}
            loading="lazy"
            alt="scholarship possibility"
            className="  object-cover rounded-lg h-full w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ScholarshipPossibility;
