/* eslint-disable react/prop-types */
const Pagination = ({
  totalPost,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  const page = Math.ceil(totalPost / postPerPage);
  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
  }
  const className = `border border-slate-600 bg-[#0F141E] hover:bg-transparent cursor-pointer rounded-sm p-2 text-sm flex items-center`;
  return (
    <div className=" flex justify-center items-center mt-2">
      <ul className=" flex gap-4 items-center">
        {pageNumbers.map((page, id) => (
          <li
            key={id}
            onClick={() => {
              setCurrentPage(page);
            }}
            className={
              page == currentPage
                ? className
                : `border border-slate-600 bg-transparent cursor-pointer rounded-sm h-7 w-7 flex items-center justify-center `
            }
          >
            {" "}
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
