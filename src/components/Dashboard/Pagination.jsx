const Pagination = ({ totalPosts, postPerPage, setCurrentPage, active }) => {
  let Pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    Pages.push(i);
  }

  return (
    <div className=" flex justify-center gap-3 items-center p-1">
      {Pages.map((page, index) => (
        <button
          onClick={() => setCurrentPage(page)}
          key={index}
          className="h-8 w-7 rounded-sm p-1 border border-1 border-gray-200 align-center font-medium hover:bg-gray-300 hover:duration-150 hover:ease-out cc"
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
