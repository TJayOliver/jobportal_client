/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import FormInputs from "../formInputs";
import { regions } from "../countries";
import { useEffect, useState } from "react";
import { fetch, BASE_URL } from "../../../pages/request";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats, editorStyle } from "../../reactquillmodules";
import { LoadingAdmin } from "../../Loading/Loading";
import { ThreeDots } from "react-loader-spinner";

const JobForm = ({ username }) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState("");
  /* const [overview, setOverview] = useState(""); */

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("category", setCategory, setLoading, signal, setMessage);
    return () => controller.abort();
  }, []);

  const [gform, setGForm] = useState({
    image: null,
    /* overview: "", */
    company: "",
    salary: "",
    location: "",
    website: "",
    featured: "",
    /* position: "", */
    duration: "",
    post: "",
    jobcategory: "",
    author: username,
  });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const formValues = (e) => {
    const { name, value } = e.target;
    setGForm((prev) => ({ ...prev, post: post, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/job/create`, gform);
      const data = response.data.message;
      setMessage(data);
      setSubmitted(true);
      window.alert(data);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      window.location.reload();
      window.alert(error.response.data.message);
      //console.error(error.message);
    }
  };

  return (
    <section>
      {loading ? (
        <LoadingAdmin />
      ) : (
        <form className=" p-3 flex flex-col gap-4 text-md" onSubmit={submit}>
          <div className="flex flex-col md:flex md:flex-row gap-4">
            <FormInputs
              label="Name of Company"
              htmlFor="company"
              type="text"
              id="company"
              name="company"
              value={gform.company}
              onChange={formValues}
              required={false}
              placeholder="e.g. Kwaata Industries Ltd or Leave Blank"
            />

            {/*  <FormInputs
              label="Position"
              htmlFor="position"
              type="text"
              id="position"
              name="position"
              value={gform.position}
              onChange={formValues}
              required={true}
              placeholder="e.g. General Manager"
            /> */}

            <FormInputs
              label="Salary"
              htmlFor="salary"
              type="text"
              id="salary"
              name="salary"
              value={gform.salary}
              onChange={formValues}
              required={false}
              placeholder="e.g. 500 or Leave Blank"
            />

            <FormInputs
              label="Company Website"
              htmlFor="website"
              type="text"
              id="website"
              name="website"
              value={gform.website}
              onChange={formValues}
              required={false}
              placeholder="e.g. www.cocacola.com"
            />
          </div>

          <div className="flex flex-col md:flex md:flex-row gap-4">
            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="featured">Featured</label>
              <select
                id="featured"
                name="featured"
                value={gform.featured}
                onChange={formValues}
                className="bg-transparent border-[1px] border-gray-300 p-2 w-full outline-teal-600 focus-within:bg-white "
                required
              >
                <option value="" disabled>
                  -- Select Featured --{" "}
                </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="duration">Contract Type</label>
              <select
                id="duration"
                name="duration"
                value={gform.duration}
                onChange={formValues}
                className="bg-transparent border-[1px] border-gray-300 p-2 w-full outline-teal-600 focus-within:bg-white "
                required
              >
                <option value="" disabled>
                  -- Select Contract Type --{" "}
                </option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>

            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="location">Select Location</label>
              <select
                id="location"
                name="location"
                value={gform.location}
                onChange={formValues}
                className="bg-transparent border-[1px] border-gray-300 p-2 w-full outline-teal-600 focus-within:bg-white "
                required
              >
                <option value="" disabled>
                  -- Select Location --{" "}
                </option>
                {regions.map((regions, id) => (
                  <option value={regions} key={id}>
                    {regions}
                  </option>
                ))}
              </select>
            </div>

            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="jobcategory">Select Category</label>
              <select
                id="jobcategory"
                name="jobcategory"
                value={gform.jobcategory}
                onChange={formValues}
                className="bg-transparent border-[1px] border-gray-300 p-2 w-full outline-teal-600 focus-within:bg-white "
                required
              >
                <option value="" disabled>
                  -- Select Category --{" "}
                </option>
                {category.map((cat, id) => (
                  <option key={id} value={cat.categoryname}>
                    {cat.categoryname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* <div>
            <p>Description</p>
            <ReactQuill
              className=".ql-editor"
              theme="snow"
              modules={modules}
              formats={formats}
              style={editorStyle}
              value={overview}
              onChange={setOverview}
            />
          </div> */}

          <div>
            <p>Job Details</p>
            <ReactQuill
              className=".ql-editor"
              theme="snow"
              modules={modules}
              formats={formats}
              value={gform.post}
              onChange={(content) => {
                setPost(content);
                setGForm((prev) => ({
                  ...prev,
                  post: content,
                }));
              }}
            />
          </div>

          <button className="bg-teal-600 p-2  text-white hover:bg-teal-500">
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

export default JobForm;
