/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import FormInputs from "../formInputs";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../pages/request";

const CategoryEditForm = ({ id }) => {
  const [cForm, setCForm] = useState({ categoryname: "" });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;

  const formValues = (e) => {
    const { name, value } = e.target;
    setCForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/category/edit/${id}`);
        const retrievedData = response.data.data;
        const categoryName = retrievedData.length > 0 ? retrievedData[0].categoryname : "";
        setCForm({ categoryname: categoryName });
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchCategoryName();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!cForm.categoryname) {
      window.alert("Category name cannot be empty");
      return;
    }
    try {
      const response = await axios.put(`${BASE_URL}/category/update/${id}`, cForm);
      const data = response.data.message;
      setSubmitted(true);
      window.alert(data);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      window.alert(error.response.data.message);
    }
  };

  return (
    <section className="relative">
      <form className=" p-3 flex flex-col gap-4" onSubmit={submit}>
        <FormInputs
          label="Name of Job Category"
          htmlFor="categoryname"
          type="text"
          id="categoryname"
          name="categoryname"
          value={cForm.categoryname}
          onChange={formValues}
          placeholder="e.g. Name of Job Category"
        />

        <button className=" text-xl bg-[#004242] p-2 rounded-md text-white hover:bg-teal-500">
          Add
        </button>
      </form>
    </section>
  );
};

export default CategoryEditForm;
