import { HiX } from "react-icons/hi";
import { BASE_URL } from "../../pages/request";
import { useState } from "react";
import axios from "axios";

const Subscribe = ({ subscribeState, setSubscribeState }) => {
  const [subscribeResponse, setSubscribeResponse] = useState("");
  const [subcribeEmail, setSubscribeEmail] = useState({ email: "" });
  const [checkSubscribeResponse, setCheckSubscribeResponse] = useState(false);

  const handleSubscribe = (e) => {
    const { name, value } = e.target;
    setSubscribeEmail((prev) => ({ ...prev, [name]: value }));
  };
  const submitSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/subscriber/create`,
        subcribeEmail
      );
      const data = response.data.message;
      setSubscribeResponse(data);
      setCheckSubscribeResponse(true);
      window.location.reload();
    } catch (error) {
      setSubscribeResponse(error.response.data.message);
      window.location.reload();
    }
  };

  return (
    <aside
      className={
        subscribeState
          ? " backdrop-blur-sm z-[9999] fixed h-screen w-full top-0 p-3"
          : "hidden"
      }
    >
      <div
        className={
          subscribeState
            ? " w-2/3 md:w-96 bg-[rgb(29,35,42)] absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-lg flex border border-slate-500 justify-center m-auto p-2 motion-scale-in-0"
            : ""
        }
      >
        {checkSubscribeResponse ? (
          <div className="p-4 flex justify-between">
            <small className="text-white">{subscribeResponse}</small>
            <HiX
              className=" text-5xl md:text-3xl cursor-pointer text-white/50 hover:text-white hover:duration-100 hover:ease-in"
              onClick={() => setSubscribeState(false)}
            />
          </div>
        ) : (
          <div>
            {/* heading */}
            <div className="flex justify-between p-4">
              <div className="flex flex-col">
                <p className="text-xl font-medium text-white">
                  Subscribe for updates 🔔
                </p>
              </div>
              <HiX
                className=" text-5xl md:text-3xl cursor-pointer text-white/50 hover:text-white hover:duration-100 hover:ease-in"
                onClick={() => setSubscribeState(false)}
              />
            </div>

            <form onSubmit={submitSubscribe} className="flex flex-col gap-2">
              <input
                type="text"
                name="email"
                value={subcribeEmail.email}
                onChange={handleSubscribe}
                inputMode="email"
                placeholder="youremail@domain.com"
                className="border-b border-white/10 outline-none text-white bg-transparent w-full placeholder:text-[12px] p-2"
              />
              <button
                type="submit"
                className="bg-gradient-to-tl flex justify-center items-center from-[#ee4f79] to-[#3a111c] w-full p-2 text-slate-200 rounded-xl hover:motion-preset-fade hover:motion-duration-2000"
              >
                Notify Me
              </button>
            </form>

            <small className="text-center text-[10px] text-white/80">
              We care about the protection of your data. Read our{" "}
              <a
                href="/"
                className="hover:text-white hover:duration-150 hover:ease-in hover:underline"
              >
                Privacy Policy
              </a>
              .
            </small>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Subscribe;
