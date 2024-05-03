/* eslint-disable react/prop-types */
const Pagination = ({
  totalPost,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  const page = Math.ceil(totalPost / postPerPage);
  console.log(totalPost);
  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
  }
  const className = `bg-gray-200 p-3 hover:bg-gray-300 hover:duration-100 hover:ease-out cursor-pointer rounded-md `;
  return (
    <div className=" flex justify-center items-center mt-2">
      <ul className=" flex gap-4">
        {pageNumbers.map((page, id) => (
          <li
            key={id}
            onClick={() => {
              setCurrentPage(page);
            }}
            className={
              page == currentPage
                ? className
                : `bg-gray-200 p-3 hover:bg-gray-300 hover:duration-100 hover:ease-out cursor-pointer rounded-md `
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
