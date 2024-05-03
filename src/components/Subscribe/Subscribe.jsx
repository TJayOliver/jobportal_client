import { HiX } from "react-icons/hi";
import { BASE_URL } from "../../pages/request";
import { useState } from "react";
import axios from "axios";

const Subscribe = ({ SubscribeState, SetSubscribeState }) => {
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
        SubscribeState
          ? " backdrop-blur-sm z-[9999] fixed h-screen w-full top-0 p-3"
          : "hidden"
      }
    >
      <div
        className={
          SubscribeState
            ? " w-full md:w-auto absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-lg bg-white flex justify-center m-auto p-2 "
            : ""
        }
      >
        {checkSubscribeResponse ? (
          <div className="p-4 flex justify-between">
            <small>{subscribeResponse}</small>
            <HiX
              className=" text-5xl md:text-3xl cursor-pointer"
              onClick={() => SetSubscribeState(false)}
            />
          </div>
        ) : (
          <div>
            {/* heading */}
            <div className="flex justify-between p-4">
              <div className="flex flex-col">
                <p className="text-3xl font-medium">Join our Newsletter</p>
                <small>
                  No spam! Notifications only about new updates. You can always
                  unsubscribe.
                </small>
              </div>
              <HiX
                className=" text-5xl md:text-3xl cursor-pointer"
                onClick={() => SetSubscribeState(false)}
              />
            </div>

            <form onSubmit={submitSubscribe}>
              <input
                type="text"
                name="email"
                value={subcribeEmail.email}
                onChange={handleSubscribe}
                inputMode="email"
                placeholder="Enter e-mail address"
                className="bg-gray-100 w-full p-3 rounded-sm outline-teal-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-tr from-sky-700  to-teal-400 text-white text-center p-3 rounded-lg hover:bg-gray-200 m-auto mt-4 font-medium w-full"
              >
                Notify Me
              </button>
            </form>

            <small className="text-center justify-center flex mt-1">
              We care about the protection of your data. Read our Privacy
              Policy.
            </small>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Subscribe;
