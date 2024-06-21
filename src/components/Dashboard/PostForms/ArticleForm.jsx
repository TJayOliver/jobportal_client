/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import FormInputs from "../formInputs";
import { useState, useMemo, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats, editorStyle } from "../../reactquillmodules";
import { BASE_URL } from "../../../pages/request";
import { ThreeDots } from "react-loader-spinner";
import Loading from "../../Loading/Loading";
import JoditEditor from "jodit-react";
import { joditOptions } from "../../../libs/joditEditor";

const ArticleForm = ({ username }) => {
  const [content, setContent] = useState("");
  const [aform, setAform] = useState({
    image: null,
    title: "",
    post: "",
    mainfeatured: false,
    featured: false,
    category: "",
    author: username,
  });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start Typing Content",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      enter: "div",
      buttons: joditOptions,
      buttonsMD: joditOptions,
      buttonsSM: joditOptions,
      buttonsXS: joditOptions,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
      toolbarButtonSize: "small",
      showXPathInStatusbar: false,
    }),
    []
  );

  useEffect(() => {
    const handleTouchStart = (event) => {
      // Prevent default behavior
      event.preventDefault();

      // Example: Add visual feedback
      const target = event.target;
      if (target.classList.contains("jodit-toolbar__item")) {
        target.classList.add("touch-active");
      }
    };

    const handleTouchMove = (event) => {
      event.preventDefault(); // Prevent default scrolling behavior
    };

    const handleTouchEnd = (event) => {
      // Example: Remove visual feedback
      const target = event.target;
      if (target.classList.contains("jodit-toolbar__item")) {
        target.classList.remove("touch-active");
      }
    };

    // Add event listeners for touch events
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const formValues = (e) => {
    const { name, value, type, checked } = e.target;
    setAform((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formFiles = (e) => {
    setAform({ ...aform, image: e.target.files[0], post: content });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newformData = new FormData();
    for (const key in aform) {
      newformData.append(key, aform[key]);
    }
    try {
      const response = await axios.post(`${BASE_URL}/article/create`, newformData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = response.data.message;
      setLoading(false);
      setSubmitted(true);
      window.alert(data);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      window.alert(error.response.data.message);
    }
  };

  return (
    <section className=" relative">
      {loading ? (
        <Loading />
      ) : (
        <form className=" w-full p-3 flex flex-col gap-4 text-md" onSubmit={submit}>
          <FormInputs
            label="Title"
            htmlFor="title"
            type="text"
            id="title"
            name="title"
            value={aform.title}
            onChange={formValues}
            required={true}
            placeholder="e.g. How to write a Personal Statement"
          />

          {/* <div>
            <p>Content</p>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              style={editorStyle}
              value={content}
              onChange={setContent}
            />
          </div> */}

          <div>
            <p>Content</p>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {}}
            />
          </div>

          <div className=" flex flex-col gap-1">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={aform.category}
              onChange={formValues}
              className="bg-transparent border-[1px] border-gray-300 p-2 w-full outline-teal-600 focus-within:bg-white "
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
              <label htmlFor="mainfeatured">Main Featured</label>
              <input
                className=" accent-teal-600"
                type="checkbox"
                id="mainfeatured"
                name="mainfeatured"
                onChange={formValues}
              />
            </div>

            {/* featured */}
            <div className="flex items-center gap-1">
              <label htmlFor="featured">Featured</label>
              <input
                className=" accent-teal-600"
                type="checkbox"
                id="featured"
                name="featured"
                onChange={formValues}
              />
            </div>
          </div>

          <FormInputs
            label="Upload Article Flyer"
            htmlFor="image"
            type="file"
            id="image"
            name="image"
            onChange={formFiles}
            required={true}
            accept=".jpg, .jpeg, .png, .JPG"
          />

          <button className=" p-2 bg-teal-600 rounded-md text-white w-full">
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

export default ArticleForm;
