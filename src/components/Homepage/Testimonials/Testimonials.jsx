import { useEffect, useState } from "react";
import { fetch } from "../../../pages/request.js";
import Loading from "../../Loading/Loading";
import { BASE_URL } from "../../../pages/request.js";

const TestimonialBox = ({ quote, name, image, position }) => {
  return (
    <section className=" relative flex flex-col gap-1 items-center">
      <img
        src={`${BASE_URL}/upload/${image}`}
        loading="lazy"
        className=" rounded-full h-24 w-24 object-cover"
      ></img>
      <div className="bg-white h-28 rounded-md md:w-[30rem] flex flex-col gap-2 items-center justify-center p-2">
        <p className="text-sm">"{quote}"</p>

        <small>{name}</small>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [testimonial, setTestimonial] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("testimonial", setTestimonial, setLoading, signal, setMessage);
    return () => controller.abort();
  }, []);
  return (
    <div className=" flex flex-col justify-center text-center mt-4 items-center p-2 relative bg-gray-100">
      <h1 className="p-2 font-bold text-3xl">Testimonials</h1>
      <div className="flex flex-col md:flex md:flex-row justify-between gap-4">
        {loading ? (
          <Loading />
        ) : !testimonial ? (
          <Loading />
        ) : (
          testimonial.map((post, id) => (
            <TestimonialBox
              key={id}
              quote={post.quote}
              name={post.name}
              image={post.image}
              position={post.position}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Testimonials;
