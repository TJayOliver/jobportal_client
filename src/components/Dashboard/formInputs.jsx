/* eslint-disable react/prop-types */
const FormInputs = ({
  label,
  htmlFor,
  type,
  id,
  name,
  placeholder,
  accept,
  value,
  onChange,
  required,
}) => {
  return (
    <div className=" flex flex-col gap-1 w-full">
      <label htmlFor={htmlFor} className=" text-md">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        accept={accept}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-transparent border-[1px] border-gray-300 p-2 w-full outline-teal-600 focus-within:bg-white  "
      />
    </div>
  );
};

export default FormInputs;
