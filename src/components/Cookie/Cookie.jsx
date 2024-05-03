import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../pages/request";

const Cookie = () => {
  const [message, setMessage] = useState("");
  const [close, setClose] = useState(true);
  axios.defaults.withCredentials = true;
  const submit = async (e) => {
    e.preventDefault();
    const response = "OK";
    try {
      await axios.post(`${BASE_URL}/cookie`, { response });
      setClose(false);
    } catch (error) {
      setMessage(error.response);
    }
  };

  return (
    <section
      className={
        close
          ? "fixed z-[99999] bottom-0 text-white md:h-24 w-full bg-red-600 p-3 md:p-8 flex flex-col  md:flex md:flex-row gap-3 justify-center"
          : "hidden"
      }
    >
      <p className=" flex items-center text-sm">
        We use cookies to collect your data to provide you with a better user
        experience and personalized content. By continuing to use our site, you
        consent to our use of cookies.
      </p>
      <form onSubmit={submit} className="flex gap-3">
        <button
          className="bg-white p-2 h-8 rounded-sm flex items-center text-black font-medium hover:bg-gray-100 duration-75 ease-in"
          type="submit"
        >
          Agree
        </button>
        <div
          className="bg-white p-2 h-8 rounded-sm flex items-center text-black font-medium hover:bg-gray-100 duration-75 ease-in"
          role="button"
          onClick={() => setClose(false)}
        >
          Decline
        </div>
      </form>
    </section>
  );
};

export default Cookie;
