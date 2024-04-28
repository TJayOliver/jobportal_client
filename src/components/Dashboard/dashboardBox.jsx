import { Link } from "react-router-dom";

const DashboardBox = ({ Title, icon, onClick, to }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className=" flex text-lg font-medium text-black hover:bg-gray-200 hover:duration-150 hover:ease-in hover:text-blue-900 rounded-md  cursor-pointer  gap-1 p-3"
    >
      {icon}
      <p>{Title}</p>
    </Link>
  );
};

export default DashboardBox;
