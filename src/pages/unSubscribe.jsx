import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../pages/request.js";
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const Unsubscribe = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [Email, setEmail] = useState({ email: "" });
  const handleEmail = (e) => {
    const { name, value } = e.target;
    setEmail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/unsubscribe`, Email);
      if (response.data.message) {
        setLoading(false);
        setMessage(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      navigate("/");
      setError("Internal Server Error");
    }
  };
  return (
    <main className=" h-screen grid place-content-center ">
      {!message && (
        <form onSubmit={submit} className="flex flex-col gap-8">
          <h1 className="font-bold text-xl text-black">
            Enter Your E-mail Address
          </h1>
          <input
            type="text"
            name="email"
            inputMode="email"
            value={Email.email}
            onChange={handleEmail}
            className="border-[0.5px] text-black bg-gray-50 focus:bg-white outline-none rounded-md px-2 h-10"
          />
          <button className="rounded-md h-10 px-2 flex justify-center items-center bg-black text-white font-medium hover:bg-black/80">
            {loading ? (
              <ThreeDots color="white" height="8px" />
            ) : (
              <p>Unsubscribe</p>
            )}
          </button>
        </form>
      )}
      {message && (
        <section>
          <p className="font-bold">You Have Successfully Unsubscribed</p>
        </section>
      )}
    </main>
  );
};

export default Unsubscribe;
