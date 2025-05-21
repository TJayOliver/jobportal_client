import { IoFilter } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const SearchBar = ({
  name,
  value,
  placeholder,
  onChange,
  searchFunction,
  link,
  setSearchResultsVerified,
  setSearchResults,
  setMessage,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const inputRef = useRef(null);
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  useEffect(() => {
    if (isSearchVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchVisible]);

  const [searchInput, setSearchInput] = useState({ filter: "Recent" });
  const handleFilterChange = async (e) => {
    const { value } = e.target;
    setSearchInput((prev) => ({ ...prev, filter: value }));
    try {
      const response = await axios.post(`${BASE_URL}/${link}`, searchInput);
      setSearchResultsVerified(true);
      setSearchResults(response.data.data);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <div
        onClick={toggleSearch}
        className="rounded-full h-10 w-10 border border-slate-300 flex items-center justify-center"
      >
        <CiSearch size={20} className="text-white  cursor-pointer" />
      </div>
      <input
        ref={inputRef}
        type="search"
        onKeyDown={(e) => e.key === "Enter" && searchFunction(e)}
        enterKeyHint="search"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`text-black border placeholder:text-sm placeholder:text-slate-400 px-2 border-slate-300 rounded-3xl p-1 outline-none transition-all duration-300 ease-in-out ${
          isSearchVisible ? "w-full opacity-100" : "w-0 opacity-0 "
        }`}
      />
      <div className="rounded-3xl border border-slate-300 p-2 flex justify-between items-center gap-1 relative">
        <IoFilter />
        <select
          value={searchInput.filter}
          onChange={handleFilterChange}
          className="bg-transparent outline-none border-none [&>option]:bg-[#191919]"
        >
          <option value="Recent">Recent</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
