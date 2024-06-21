/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import FormInputs from "../formInputs";
import FormTextarea from "../formTextarea";
import axios from "axios";
import { BASE_URL } from "../../../pages/request";

const TestimonialForm = ({ id }) => {
  const [testimonial, setTestimonial] = useState({
    image: null,
    quote: "",
    name: "",
    position: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  const formValues = (e) => {
    const { name, value } = e.target;
    setTestimonial((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formFiles = (e) => {
    setTestimonial({ ...testimonial, image: e.target.files[0] });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/testimonial/edit/${id}`);
        const retrievedData = response.data.data[0];
        setTestimonial({
          image: retrievedData.image,
          quote: retrievedData.quote,
          position: retrievedData.position,
          name: retrievedData.name,
        });
        setLoading(false);
      } catch (error) {
        window.alert(error.response.data.message);
      }
    };
    fetch();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const newformData = new FormData();
    for (const key in testimonial) {
      newformData.append(key, testimonial[key]);
    }
    try {
      const response = await axios.put(`${BASE_URL}/testimonial/update/${id}`, newformData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = response.data.message;
      setMessage(data);
      setSubmitted(true);
      window.alert(data);
      window.location.reload();
    } catch (error) {
      window.alert(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };
  return (
    <section className=" relative">
      <form className=" w-full p-3 flex flex-col gap-4 text-md" onSubmit={submit}>
        <FormInputs
          label="Name"
          htmlFor="name"
          type="text"
          id="name"
          name="name"
          value={testimonial.name}
          onChange={formValues}
          required={true}
          placeholder="Enter The Person's Name"
        />

        <FormInputs
          label="Position"
          htmlFor="position"
          type="text"
          id="position"
          name="position"
          value={testimonial.position}
          onChange={formValues}
          required={true}
          placeholder="Enter Where the Person is Working Now"
        />

        <FormTextarea
          label="Message"
          htmlFor="quote"
          id="quote"
          placeholder="Enter message"
          name="quote"
          value={testimonial.quote}
          required={true}
          onChange={formValues}
        />

        <FormInputs
          label="Upload Image"
          htmlFor="image"
          type="file"
          id="image"
          name="image"
          onChange={formFiles}
          required={false}
          accept=".jpg, .jpeg, .png, .JPG"
        />

        <button className=" p-2 bg-teal-600 rounded-md text-white w-full">Post</button>
      </form>
    </section>
  );
};

export default TestimonialForm;
