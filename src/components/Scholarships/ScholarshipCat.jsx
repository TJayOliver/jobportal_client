/* eslint-disable react/prop-types */
const ScholarshipCategoryBox = ({ image, category, text, to, color }) => {
  return (
    <div className="rounded-2xl group hover:bg-gray-50 h-[17rem] md:h-[22rem] md:w-[23%] shrink-0 p-4 flex flex-col justify-around duration-150 ease-out hover:drop-shadow-md relative">
      <img
        src={image}
        className="rounded-xl h-[8.5rem] md:h-48 md:w-82 object-cover"
      />
      <div className=" flex flex-col items-center text-center">
        <p className="font-medium text-2xl">{category}</p>
        <small>{text}</small>
      </div>
      <a
        href={to}
        className={`hidden cursor-pointer text-center p-2 rounded-lg absolute -bottom-2 w-full left-0 group-hover:block text-white duration-100 ease-out ${color}`}
      >
        View More
      </a>
    </div>
  );
};

export default ScholarshipCategoryBox;
