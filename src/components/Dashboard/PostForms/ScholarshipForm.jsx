/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import FormInputs from "../formInputs";
import { countries } from "../countries";
import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats, editorStyle } from "../../reactquillmodules";
import { BASE_URL } from "../../../pages/request";
import { ThreeDots } from "react-loader-spinner";
import Loading from "../../Loading/Loading";

const ScholarshipForm = ({ username }) => {
  const [description, setDescription] = useState("");
  const [post, setPost] = useState("");

  const [sForm, setSForm] = useState({
    scholarshipname: "",
    deadline: "",
    scholarshiptype: "",
    featured: false,
    programs: "",
    country: "",
    description: "",
    scholarshipcategory: "",
    website: "",
    post: "",
    author: username,
  });

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  const FormValues = (e) => {
    const { name, value, type, checked } = e.target;
    setSForm((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/scholarship/create`,
        sForm
      );
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
        <form onSubmit={Submit} className=" p-3 flex flex-col gap-4 text-md">
          <FormInputs
            label="Scholarship Name"
            htmlFor="scholarshipname"
            type="text"
            id="scholarshipname"
            name="scholarshipname"
            value={sForm.scholarshipname}
            onChange={FormValues}
            required={true}
            placeholder="e.g. Afghanistan Government Scholarships"
          />

          <div className="flex flex-col md:flex md:flex-row gap-4">
            <FormInputs
              label="Deadline"
              htmlFor="deadline"
              type="date"
              id="deadline"
              name="deadline"
              value={sForm.deadline}
              required={true}
              onChange={FormValues}
            />

            <FormInputs
              label="Website"
              htmlFor="website"
              type="text"
              id="website"
              name="website"
              value={sForm.website}
              required={true}
              onChange={FormValues}
            />

            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="scholarshiptype">Type</label>
              <select
                id="scholarshiptype"
                name="scholarshiptype"
                value={sForm.scholarshiptype}
                onChange={FormValues}
                className="bg-transparent border-[1px] border-gray-300 p-2 w-full outline-teal-600 focus-within:bg-white "
                required
              >
                <option value="" disabled>
                  --Scholarship Type --
                </option>
                <option value="Fully Funded">Fully Funded</option>
                <option value="Partially Funded">Partially Funded</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex md:flex-row gap-4">
            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="scholarshipcategory">Category</label>
              <select
                id="scholarshipcategory"
                name="scholarshipcategory"
                value={sForm.scholarshipcategory}
                onChange={FormValues}
                className="bg-transparent border-[1px] border-gray-300 p-2 w-full outline-teal-600 focus-within:bg-white "
                required
              >
                <option value="" disabled>
                  -- Category --{" "}
                </option>
                <option value="Government">Government</option>
                <option value="Organizational">Organizational</option>
                <option value="Research">Research</option>
                <option value="Private">Private</option>
                <option value="International">International</option>
              </select>
            </div>

            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="programs">Study Area</label>
              <select
                id="programs"
                name="programs"
                value={sForm.programs}
                onChange={FormValues}
                className="bg-transparent border-[1px] border-gray-300 p-2 w-full outline-teal-600 focus-within:bg-white "
                required
              >
                <option value="" disabled>
                  -- Select Study Area --{" "}
                </option>
                <option value="All Levels">All Levels</option>
                <option value="Bachelors Degree">Bachelors Degree</option>
                <option value="Masters Degree">Masters Degree</option>
                <option value="Doctorate Degree">Doctorate Degree</option>
                <option value="Post Graduate Diploma">
                  Post Graduate Diploma
                </option>
              </select>
            </div>

            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="country">Select Host Country</label>
              <select
                id="country"
                name="country"
                value={sForm.country}
                onChange={FormValues}
                className="bg-transparent border-[1px] border-gray-300 p-2 w-full outline-teal-600 focus-within:bg-white "
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
          </div>

          <div>
            <p>Description</p>
            <ReactQuill
              className=".ql-editor"
              theme="snow"
              modules={modules}
              formats={formats}
              style={editorStyle}
              value={description}
              onChange={setDescription}
            />
          </div>

          <div>
            <p>Scholarship Information</p>
            <ReactQuill
              className=".ql-editor"
              theme="snow"
              modules={modules}
              formats={formats}
              style={editorStyle}
              value={post}
              onChange={setPost}
            />
          </div>

          {/* checkbox */}
          <div className="flex items-center gap-1">
            <label htmlFor="featured">Featured</label>
            <input
              className="accent-teal-600"
              type="checkbox"
              id="featured"
              name="featured"
              onChange={FormValues}
            />
          </div>

          <button className=" bg-teal-600 p-2  text-white hover:bg-teal-500">
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

export default ScholarshipForm;
