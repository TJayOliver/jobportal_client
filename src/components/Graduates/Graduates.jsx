import GraduateButtons from "./graduateButtons";
import CoverPic from "../../assets/cyril.jpg";

const Graduates = () => {
  return (
    <div className=" h-[22rem] relative duration-700 ease-out ">
      <div
        className=" absolute right-0 w-full 
            bg-gradient-to-b
            from-[rgba(0,0,0,.1)]
            to-[rgba(0,0,0)]
            md:bg-gradient-to-r
            md:from-[rgba(0,0,0, 4)],
            md:from-[rgba(0,0,0,.1)]
            md:to-[rgba(0,0,0)]
            h-[28rem]"
      >
        <div className=" absolute right-0 top-[12rem] md:top-40 text-white px-2 ">
          <h1 className=" text-2xl md:text-3xl">Are you a recent graduate?</h1>
          <h3>We assist in Providing you with more opportunities</h3>
        </div>

        <div className=" flex gap-2 mt-1 absolute top-[16rem] right-0 md:top-2/4 p-2">
          <GraduateButtons text={"Entry Level Jobs"} />
          <GraduateButtons text={"Study Abroad"} />
          <GraduateButtons text={"CV Writing"} />
        </div>
      </div>
      <img
        className=" w-full object-cover h-[22rem]"
        src={CoverPic}
        alt="graduation picture"
      />
    </div>
  );
};

export default Graduates;
