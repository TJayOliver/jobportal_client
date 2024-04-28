import { BsTwitter, BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";

const SocialMedia = () => {
  return (
    <div className=" bg-gray-50 h-[15rem] flex justify-center">
      <div className=" flex gap-12 m-auto text-4xl align-middle text-white">
        <BsTwitter className="text-[#004242]" role="button" />
        <BsFacebook className="text-[#004242]" role="button" />
        <BsInstagram className="text-[#004242]" role="button" />
        <BsLinkedin className="text-[#004242]" role="button" />
      </div>
    </div>
  );
};

export default SocialMedia;
