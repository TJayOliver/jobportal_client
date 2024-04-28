const Categories = ({ Category }) => {
  return (
    <div className=" h-12 w-44 rounded-3xl shrink-0 border-gray-200 border-[1px] flex items-center justify-center ">
      <p className=" font-bold">{Category}</p>
    </div>
  );
};

export default Categories;
