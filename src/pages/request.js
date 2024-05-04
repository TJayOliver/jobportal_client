import axios from "axios";

export const BASE_URL = "https://futureforte.onrender.com";

export const fetch = async (
  link,
  setState,
  setLoading,
  signall,
  setMessage,
  setCookieTracker
) => {
  try {
    const response = await axios.get(`${BASE_URL}/${link}`, {
      signall,
    });
    setState(response.data.data);
    setCookieTracker(response.data.callCookie);
    setLoading(false);
    setMessage(response.data.message);
  } catch (error) {
    //console.error(error.message)
  }
};

export const fetchByID = async (
  link,
  id,
  setState,
  setLoading,
  signall,
  setMessage,
  setCookieTracker
) => {
  try {
    const response = await axios.get(`${BASE_URL}/${link}/${id}`, {
      signall,
    });
    setState(response.data.data);
    setCookieTracker(response.data.callCookie);
    setLoading(false);
    setMessage(response);
  } catch (error) {
    //console.error(error.message);
  }
};
