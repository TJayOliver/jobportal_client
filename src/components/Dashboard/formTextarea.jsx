const FormTextarea = ({
  label,
  htmlFor,
  id,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className=" flex flex-col gap-1">
      <label htmlFor={htmlFor} className=" text-md">
        {label}
      </label>
      <textarea
        cols={5}
        rows={5}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="bg-transparent border-[1px] border-black p-2 w-full outline-teal-600 focus-within:bg-white rounded-md"
      />
    </div>
  );
};

export default FormTextarea;
