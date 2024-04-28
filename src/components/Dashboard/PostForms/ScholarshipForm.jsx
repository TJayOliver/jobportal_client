import FormInputs from "../formInputs";
import { countries } from "../countries";
import axios from "axios";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../reactquillmodules";

const ScholarshipForm = ({ username }) => {
  const [description, setDescription] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [duration, setDuration] = useState("");
  const [programsoffered, setProgramsoffered] = useState("");
  const [documentsrequired, setDocumentsrequired] = useState("");
  const [benefits, setBenefits] = useState("");
  const [applicationinformation, setApplicationinformation] = useState("");

  const [sForm, setSForm] = useState({
    image: null,
    scholarshipname: "",
    deadline: "",
    scholarshiptype: "",
    featured: false,
    programs: "",
    country: "",
    description: "",
    scholarshipcategory: "",
    eligibility: "",
    duration: "",
    programsoffered: "",
    documentsrequired: "",
    benefits: "",
    applicationinformation: "",
    agent: "",
    hostuniversity: "",
    author: username,
  });

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const FormValues = (e) => {
    const { name, value, type, checked } = e.target;
    setSForm((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const FormFiles = (e) => {
    setSForm({
      ...sForm,
      image: e.target.files[0],
      description: description,
      eligibility: eligibility,
      duration: duration,
      programsoffered: programsoffered,
      documentsrequired: documentsrequired,
      benefits: benefits,
      applicationinformation: applicationinformation,
    });
  };

  const Submit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    for (const key in sForm) {
      newFormData.append(key, sForm[key]);
    }
    try {
      const response = await axios.post(
        "http://localhost:4040/scholarship/create",
        newFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const data = response.data.message;
      setMessage(data);
      setSubmitted(true);
      window.alert(data);
      window.location.reload();
    } catch (error) {
      window.alert(data);
      console.error(error.message);
    }
  };

  return (
    <section>
      <form onSubmit={Submit} className=" p-3 flex flex-col gap-4 text-md">
        <FormInputs
          label="Name"
          htmlFor="scholarshipname"
          type="text"
          id="scholarshipname"
          name="scholarshipname"
          value={sForm.scholarshipname}
          onChange={FormValues}
          placeholder="e.g. Afghanistan Government Scholarships"
        />

        <FormInputs
          label="Host University"
          htmlFor="hostuniversity"
          type="text"
          id="hostuniversity"
          name="hostuniversity"
          value={sForm.hostuniversity}
          onChange={FormValues}
          placeholder="e.g. University for Development Studies"
        />

        <div className="flex flex-col md:flex md:flex-row gap-4">
          <FormInputs
            label="Deadline"
            htmlFor="deadline"
            type="date"
            id="deadline"
            name="deadline"
            value={sForm.deadline}
            onChange={FormValues}
          />

          <div className=" flex flex-col gap-1">
            <label htmlFor="scholarshiptype">Type</label>
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
            <label htmlFor="scholarshiptype">Agent</label>
            <select
              id="agent"
              name="agent"
              value={sForm.agent}
              onChange={FormValues}
              className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
              required
            >
              <option value="" disabled>
                --Agent --
              </option>
              <option value="Agent">Agent</option>
              <option value="No agent">No Agent</option>
            </select>
          </div>

          <div className=" flex flex-col gap-1">
            <label htmlFor="scholarshipcategory">Category</label>
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
            <label htmlFor="programs">Study Area</label>
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
            <label htmlFor="country">Select Host Country</label>
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
          <p>Description</p>
          <ReactQuill
            className=" border-black border-[1px] rounded-lg"
            theme="snow"
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
        </div>

        <div>
          <p>Eligibility Criteria</p>
          <ReactQuill
            className=" border-black border-[1px] rounded-lg"
            theme="snow"
            modules={modules}
            formats={formats}
            value={eligibility}
            onChange={setEligibility}
          />
        </div>

        <div>
          <p>Duration</p>
          <ReactQuill
            className=" border-black border-[1px] rounded-lg"
            theme="snow"
            modules={modules}
            formats={formats}
            value={duration}
            onChange={setDuration}
          />
        </div>

        <div>
          <p>Programs Offered</p>
          <ReactQuill
            className="text-xl border-black border-[1px] rounded-lg"
            theme="snow"
            modules={modules}
            formats={formats}
            value={programsoffered}
            onChange={setProgramsoffered}
          />
        </div>

        <div>
          <p>Documents Required</p>
          <ReactQuill
            className="text-xl border-black border-[1px] rounded-lg"
            theme="snow"
            modules={modules}
            formats={formats}
            value={documentsrequired}
            onChange={setDocumentsrequired}
          />
        </div>

        <div>
          <p>Benefits</p>
          <ReactQuill
            className="text-xl border-black border-[1px] rounded-lg"
            theme="snow"
            modules={modules}
            formats={formats}
            value={benefits}
            onChange={setBenefits}
          />
        </div>

        <div>
          <p>Application Information</p>
          <ReactQuill
            className="text-xl border-black border-[1px] rounded-lg"
            theme="snow"
            modules={modules}
            formats={formats}
            value={applicationinformation}
            onChange={setApplicationinformation}
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

        <FormInputs
          label="Upload Scholarship Flyer"
          htmlFor="image"
          type="file"
          id="image"
          name="image"
          onChange={FormFiles}
          accept="image/*"
        />

        <button className=" bg-teal-600 p-2 rounded-md text-white hover:bg-teal-500">
          POST
        </button>
      </form>
    </section>
  );
};

export default ScholarshipForm;
