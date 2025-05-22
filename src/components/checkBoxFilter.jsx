const CheckBoxFilter = ({ name, value, onChange, filterGroup, filters }) => {
  return (
    <div className="flex gap-1">
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={onChange}
        checked={filters[filterGroup].includes(value)}
        className="accent-[#8E1616]"
      />
      <p>{name}</p>
    </div>
  );
};

export default CheckBoxFilter;
