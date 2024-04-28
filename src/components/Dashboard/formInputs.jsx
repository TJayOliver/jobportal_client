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
}) => {
  return (
    <div className=" flex flex-col gap-1">
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
        required
        className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md "
      />
    </div>
  );
};

export default FormInputs;
