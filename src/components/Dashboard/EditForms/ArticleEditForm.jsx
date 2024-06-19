/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import FormInputs from "../formInputs";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../reactquillmodules";
import Loading from "../../Loading/Loading";
import { BASE_URL } from "../../../pages/request";
import { ThreeDots } from "react-loader-spinner";

const ArticleEditForm = ({ id }) => {
  const [aform, setAform] = useState({
    image: null,
    title: "",
    mainfeatured: false,
    featured: false,
    post: "",
    category: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState("");

  const formValues = (e) => {
    const { name, value, type, checked } = e.target;
    setAform((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const contentHandle = (value) => {
    setContent(value);
  };

  const formFiles = (e) => {
    setAform({ ...aform, image: e.target.files[0], post: content });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/article/edit/${id}`);
        const retrievedData = response.data.data[0];
        setAform({
          image: retrievedData.image,
          title: retrievedData.title,
          mainfeatured: retrievedData.mainfeatured,
          featured: retrievedData.featured,
          category: retrievedData.category,
        });
        setContent(retrievedData.post);
        setLoading(false);
      } catch (error) {
        setMessage(error.response.data.message);
        window.alert(error.response.data.message);
      }
    };
    fetch();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newformData = new FormData();
    for (const key in aform) {
      newformData.append(key, aform[key]);
    }
    try {
      const response = await axios.put(`${BASE_URL}/article/update/${id}`, newformData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      setSubmitted(true);
      setLoading(false);
      window.alert(response.data.message);
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message);
      window.alert(error.response.data.message);
    }
  };

  return (
    <section className="relative">
      {loading ? (
        <Loading />
      ) : (
        <form className=" w-full p-3 flex flex-col gap-4 " onSubmit={submit}>
          <FormInputs
            label="Title"
            htmlFor="title"
            type="text"
            id="title"
            name="title"
            value={aform.title}
            onChange={formValues}
            placeholder="e.g. How to write a Personal Statement"
          />

          {/* content */}
          <div>
            <p className="text-xl">Content</p>
            <ReactQuill
              className="text-xl border-black border-[1px] rounded-lg text-black p-1"
              theme="snow"
              modules={modules}
              formats={formats}
              value={content}
              onChange={contentHandle}
            />
          </div>

          {/* category */}
          <div className=" flex flex-col gap-1">
            <label htmlFor="category" className=" text-xl">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={aform.category}
              onChange={formValues}
              className="bg-transparent border-[1px] p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
              required
            >
              <option value="" disabled>
                -- Select Category --{" "}
              </option>
              <option value="Job">Job</option>
              <option value="Scholarship">Scholarship</option>
            </select>
          </div>

          {/* checkbox */}
          <div className=" flex gap-4 items-center">
            {/* main featured */}
            <div className="flex items-center gap-1">
              <label htmlFor="mainfeatured" className=" text-lg">
                Main Featured
              </label>
              <input type="checkbox" id="mainfeatured" name="mainfeatured" onChange={formValues} />
            </div>

            {/* featured */}
            <div className="flex items-center gap-1">
              <label htmlFor="featured" className=" text-lg">
                Featured
              </label>
              <input type="checkbox" id="featured" name="featured" onChange={formValues} />
            </div>
          </div>

          <FormInputs
            label="Upload Flyer"
            htmlFor="image"
            type="file"
            id="image"
            name="image"
            onChange={formFiles}
            accept=".jpg, .jpeg, .png, .JPG"
          />

          <button className=" text-xl p-2 bg-[#004242] rounded-md text-white hover:bg-teal-500 w-full">
            {" "}
            {loading ? (
              <ThreeDots color="white" height="8px" />
            ) : (
              <p className="font-medium">Post</p>
            )}
          </button>
        </form>
      )}
    </section>
  );
};

export default ArticleEditForm;
