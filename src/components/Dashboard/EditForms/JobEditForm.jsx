/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import FormInputs from "../formInputs";
import { countries } from "../countries";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Loading/Loading";
import { fetch, BASE_URL } from "../../../pages/request";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../reactquillmodules";
import { ThreeDots } from "react-loader-spinner";

const JobEditForm = ({ id }) => {
  const [category, setCategory] = useState([]);
  const [post, setPost] = useState("");
  const [overview, setOverview] = useState("");

  const [gform, setGForm] = useState({
    image: null,
    overview: "",
    company: "",
    salary: "",
    location: "",
    website: "",
    featured: "",
    position: "",
    duration: "",
    post: "",
    jobcategory: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(true);

  const formValues = (e) => {
    const { name, value } = e.target;
    setGForm((prev) => ({ ...prev, [name]: value }));
  };
  const formFiles = (e) => {
    setGForm({
      ...gform,
      image: e.target.files[0],
      post: post,
      overview: overview,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchEdit = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/job/edit/${id}`);
        const retrievedData = response.data.data;
        setGForm({
          image: retrievedData.image,
          company: retrievedData.company,
          salary: retrievedData.salary,
          location: retrievedData.location,
          website: retrievedData.website,
          featured: retrievedData.featured,
          position: retrievedData.position,
          duration: retrievedData.duration,
          jobcategory: retrievedData.jobcategory,
        });
        setPost(retrievedData.post);
        setOverview(retrievedData.overview);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        window.alert(error.response.data.message);
        window.location.reload();
        //console.error(error.message);
      }
    };

    fetch("category", setCategory, setLoading, signal, setMessage);
    fetchEdit();

    return () => controller.abort();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newFormData = new FormData();
      for (const key in gform) {
        newFormData.append(key, gform[key]);
      }
      const response = await axios.put(`${BASE_URL}/job/update/${id}`, newFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = response.data.message;
      setMessage(data);
      setSubmitted(true);
      window.alert(data);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      window.alert(error.response.data.message);
      //console.error(error.message);
    }
  };

  return (
    <section>
      {loading ? (
        <Loading />
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
              placeholder="e.g. Kwaata Industries Ltd"
            />

            <FormInputs
              label="Salary"
              htmlFor="salary"
              type="text"
              id="salary"
              name="salary"
              value={gform.salary}
              onChange={formValues}
              placeholder="e.g. 500 or Confidential"
            />

            <FormInputs
              label="Position"
              htmlFor="position"
              type="text"
              id="position"
              name="position"
              value={gform.position}
              onChange={formValues}
              placeholder="e.g. General Manager"
            />

            <FormInputs
              label="Company Website"
              htmlFor="website"
              type="text"
              id="website"
              name="website"
              value={gform.website}
              onChange={formValues}
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
                className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
                required
              >
                <option value="" disabled>
                  -- Select Featured --
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
                className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
                required
              >
                <option value="" disabled>
                  -- Select Job Contract Type --{" "}
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
                className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
                required
              >
                <option value="" disabled>
                  -- Select Country --{" "}
                </option>
                {countries.map((country, id) => (
                  <option value={country} key={id}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="jobcategory">Select Job Category</label>
              <select
                id="jobcategory"
                name="jobcategory"
                value={gform.jobcategory}
                onChange={formValues}
                className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
                required
              >
                <option value="" disabled>
                  -- Select Job Category --{" "}
                </option>
                {category.map((cat, id) => (
                  <option key={id} value={cat.categoryname}>
                    {cat.categoryname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p>Overview</p>
            <ReactQuill
              className=" border-black border-[1px] rounded-lg"
              theme="snow"
              modules={modules}
              formats={formats}
              value={overview}
              onChange={setOverview}
            />
          </div>

          <div>
            <p>Job Information</p>
            <ReactQuill
              className=" border-black border-[1px] rounded-lg"
              theme="snow"
              modules={modules}
              formats={formats}
              value={post}
              onChange={setPost}
            />
          </div>

          <FormInputs
            label="Upload Job Flyer"
            htmlFor="image"
            type="file"
            id="image"
            name="image"
            onChange={formFiles}
            accept="image/*"
          />

          <button className="bg-teal-600 p-2 rounded-md text-white hover:bg-teal-500">
            {" "}
            {loading ? (
              <ThreeDots color="white" height="8px" />
            ) : (
              <p className="font-medium">Update</p>
            )}
          </button>
        </form>
      )}
    </section>
  );
};

export default JobEditForm;
