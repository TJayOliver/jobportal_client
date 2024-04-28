import { useParams } from "react-router-dom";
import { fetchByID } from "../pages/request.js";
import { useEffect, useState } from "react";

const Unsubscribe = () => {
  const params = useParams();
  const id = params.id;
  const [unsubscribe, setUnsubscribe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const signall = controller.signal;
    fetchByID(
      "unsubscribe",
      id,
      setUnsubscribe,
      setLoading,
      signall,
      setMessage
    );
    return () => controller.abort();
  }, [id]);
  return (
    <main className=" h-screen grid place-content-center ">
      {message && (
        <section>
          <p className="font-bold">You Have Successfully Unsubscribe</p>
        </section>
      )}
    </main>
  );
};

export default Unsubscribe;
