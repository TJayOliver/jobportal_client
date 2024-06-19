/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import FormInputs from "../formInputs";
import { BASE_URL } from "../../../pages/request";

const CreateAdminForm = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
    name: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    role: "",
    image: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const formValues = (e) => {
    const { name, value } = e.target;
    setAdminCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const formFiles = (e) => {
    setAdminCredentials({ ...adminCredentials, image: e.target.files[0] });
  };

  const submit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    for (const key in adminCredentials) {
      newFormData.append(key, adminCredentials[key]);
    }
    try {
      const response = await axios.post(`${BASE_URL}/admin/create`, adminCredentials, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = response.data.message;
      setMessage(data);
      setSubmitted(true);
      window.alert(data);
      window.location.reload();
    } catch (error) {
      console.error(error.message);
      window.alert(error.response.data.message);
    }
  };

  return (
    <section className=" relative">
      <form className=" p-3 flex flex-col gap-4 texy-md" onSubmit={submit}>
        <FormInputs
          label="Full Name"
          htmlFor="name"
          type="text"
          id="name"
          name="name"
          value={adminCredentials.name}
          onChange={formValues}
          placeholder="e.g. Full Name "
        />
        <FormInputs
          label="Username"
          htmlFor="username"
          type="text"
          id="username"
          name="username"
          value={adminCredentials.username}
          onChange={formValues}
          placeholder="e.g. Username"
        />
        <FormInputs
          label="password"
          htmlFor="password"
          type="text"
          id="password"
          name="password"
          value={adminCredentials.password}
          onChange={formValues}
          placeholder="e.g. Password"
        />
        <FormInputs
          label="Twitter Handle"
          htmlFor="twitter"
          type="text"
          id="twitter"
          name="twitter"
          value={adminCredentials.twitter}
          onChange={formValues}
          placeholder="e.g. Twitter Handle"
        />
        <FormInputs
          label="Facebook Handle"
          htmlFor="facebook"
          type="text"
          id="facebook"
          name="facebook"
          value={adminCredentials.facebook}
          onChange={formValues}
          placeholder="e.g. Facebook Handle"
        />
        <FormInputs
          label="LinkedIn Handle"
          htmlFor="linkedin"
          type="text"
          id="linkedin"
          name="linkedin"
          value={adminCredentials.linkedin}
          onChange={formValues}
          placeholder="e.g. LinkedIn Handle"
        />
        <div className=" flex flex-col gap-1">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={adminCredentials.role}
            onChange={formValues}
            className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
            required
          >
            <option value="" disabled>
              -- Select Role --{" "}
            </option>
            <option value="super">Super Admin</option>
            <option value="normal">Normal Admin</option>
          </select>
        </div>
        <FormInputs
          label="Upload Admin Image"
          htmlFor="image"
          type="file"
          id="image"
          name="image"
          onChange={formFiles}
          accept=".jpg, .jpeg, .png, .JPG"
        />
        <button className=" bg-blue-600 p-2 rounded-md text-white hover:bg-blue-500">CREATE</button>
      </form>
    </section>
  );
};

export default CreateAdminForm;
