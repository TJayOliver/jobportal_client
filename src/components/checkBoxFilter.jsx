const randomNumber = Math.floor(Math.random() * 1001);
const CheckBoxFilter = ({
  name,
  value,
  onChange,
  filterGroup,
  filters,
  id,
}) => {
  return (
    <div className="flex gap-1">
      <input
        key={id || randomNumber}
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
