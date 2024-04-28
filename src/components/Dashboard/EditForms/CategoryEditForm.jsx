import FormInputs from "../formInputs";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryEditForm = ({ id }) => {
  const [cForm, setCForm] = useState({ categoryname: "" });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const formValues = (e) => {
    const { name, value } = e.target;
    setCForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4040/category/update/${id}`,
        cForm,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const data = response.data.message;
      setSubmitted(true);
      window.alert(data);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4040/category/edit/${id}`)
      .then((response) => {
        const retrievedData = response.data.data[0];
        setCForm({ categoryname: retrievedData.categoryname });
      })
      .catch((error) => console.error(error));
  }, []);

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

        <button className=" text-xl bg-blue-600 p-2 rounded-md text-white hover:bg-blue-500">
          ADD
        </button>
      </form>
    </section>
  );
};

export default CategoryEditForm;
