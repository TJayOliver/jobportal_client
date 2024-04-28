const OverviewBox = ({ title, count, logo }) => {
  return (
    <div className=" h-24 w-full md:w-72 border border-gray-200 rounded-md p-3 flex items-center justify-evenly">
      {logo}
      <div>
        <p>{title}</p>
        <p className=" text-3xl font-medium">{count}</p>
      </div>
    </div>
  );
};

export default OverviewBox;
