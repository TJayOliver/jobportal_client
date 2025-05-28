/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import FormInputs from "../formInputs";
import { countries } from "../countries";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loading from "../../Loading/Loading";
import { modules, formats } from "../../reactquillmodules";
import { BASE_URL } from "../../../pages/request";
import moment from "moment";
import { ThreeDots } from "react-loader-spinner";

const ScholarshipEditForm = ({ id }) => {
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
    website: "",
    scholarshipcategory: "",
    post: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const FormValues = (e) => {
    const { name, value, type, checked } = e.target;
    setSForm((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/scholarship/update/${id}`,
        sForm
      );
      const data = response.data.message;
      setSubmitted(true);
      window.alert(data);
      window.location.reload();
    } catch (error) {
      //console.error(error.message);
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/scholarship/edit/${id}`);
        const retrievedData = response.data.data;
        const formattedDeadline = moment(retrievedData.deadline).format(
          "YYYY-MM-DD"
        );
        setSForm({
          scholarshipname: retrievedData.scholarshipname,
          deadline: formattedDeadline,
          scholarshiptype: retrievedData.scholarshiptype,
          featured: retrievedData.featured,
          programs: retrievedData.programs,
          country: retrievedData.country,
          website: retrievedData.website,
          scholarshipcategory: retrievedData.scholarshipcategory,
        });
        setDescription(retrievedData.description);
        setPost(retrievedData.post);
        setLoading(false);
      } catch (error) {
        //console.error(error.message);
      }
    };
    fetch();
  }, []);

  return (
    <section className=" relative">
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={Submit} className=" p-3 flex flex-col gap-4">
          <FormInputs
            label="Name"
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
          </div>

          <div className="flex flex-col md:flex md:flex-row gap-4">
            <div className=" flex flex-col gap-1">
              <label htmlFor="scholarshiptype" className=" text-xl">
                Type
              </label>
              <select
                id="scholarshiptype"
                name="scholarshiptype"
                value={sForm.scholarshiptype}
                onChange={FormValues}
                className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
                required
              >
                <option value="" disabled>
                  --Scholarship Type --
                </option>
                <option value="Fully Funded">Fully Funded</option>
                <option value="Partially Funded">Partially Funded</option>
              </select>
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="scholarshipcategory" className=" text-xl">
                Category
              </label>
              <select
                id="scholarshipcategory"
                name="scholarshipcategory"
                value={sForm.scholarshipcategory}
                onChange={FormValues}
                className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
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

            <div className=" flex flex-col gap-1">
              <label htmlFor="programs" className=" text-xl">
                Study Area
              </label>
              <select
                id="programs"
                name="programs"
                value={sForm.programs}
                onChange={FormValues}
                className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
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

            <div className=" flex flex-col gap-1">
              <label htmlFor="country" className=" text-xl">
                Select Host Country
              </label>
              <select
                id="country"
                name="country"
                value={sForm.country}
                onChange={FormValues}
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
          </div>

          <div>
            <p className="text-xl">Description</p>
            <ReactQuill
              className="text-xl rounded-lg"
              theme="snow"
              modules={modules}
              formats={formats}
              value={description}
              onChange={(value) => setDescription(value)}
            />
          </div>

          <div>
            <p className="text-xl">Scholarship Details</p>
            <ReactQuill
              className="text-xl rounded-lg"
              theme="snow"
              modules={modules}
              formats={formats}
              value={post}
              onChange={(value) => setPost(value)}
            />
          </div>

          {/* checkbox */}
          <div className="flex items-center gap-1">
            <label htmlFor="featured" className=" text-lg">
              Featured
            </label>
            <input
              type="checkbox"
              id="featured"
              name="featured"
              onChange={FormValues}
            />
          </div>

          <button className=" text-xl bg-teal-500 p-2 rounded-md text-white hover:bg-teal-600">
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

export default ScholarshipEditForm;
