import { useEffect, useState } from "react";
import axios from "axios";
import FormInputs from "../formInputs";
import { fetch, BASE_URL } from "../../../pages/request.js";

const CategoryForm = () => {
  const [cForm, setCForm] = useState({ categoryname: "" });
  const [message, setMessage] = useState("");

  const formValues = (e) => {
    const { name, value } = e.target;
    setCForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/category/create`, cForm);
      setMessage(response.data.message);
      window.alert(response.data.message);
      window.location.reload();
    } catch (error) {
      setMessage(error.response.data.message);
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("category", setCForm, signal, setMessage);
    return () => controller.abort();
  }, []);

  return (
    <section className=" relative">
      <form className=" p-3 flex flex-col gap-4 texy-md" onSubmit={submit}>
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
        <button className=" bg-teal-600 p-2 rounded-md text-white hover:bg-teah-500">
          ADD
        </button>
      </form>
    </section>
  );
};

export default CategoryForm;
