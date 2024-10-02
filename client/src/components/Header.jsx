import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-6xl  mx-auto p-3">
        <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap">
          <Link to="/">
            <span className="text-slate-500">Mekin</span>
            <span className="text-slate-700">Jemal</span>
          </Link>
        </h1>
        <form className=" bg-slate-100 p-3 rounded-lg flex items-center  ">
          <input
            type="text"
            className=" bg-transparent focus:outline-none w-24 sm:w-64 "
            placeholder="Search... "
          />
          <span>
            <FaSearch className=" text-slate-600 " />
          </span>
        </form>
        <ul className="flex gap-4 ">
          <Link to="/">
            <li className=" hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          {user ? (
            <Link to="/profile">
              <img
                src={user.photo}
                alt="Profile"
                className=" h-7 w-7 object-cover rounded-full  "
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className=" sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
