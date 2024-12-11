import { CgMenuLeft } from "react-icons/cg";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./NavStyle.css";
import { IoSearch } from "react-icons/io5";
import useTeacher from "../../hooks/useTeacher";
import useAdmin from "../../hooks/useAdmin";

const Navbar = ({ setSearch, setValue, setCategory }) => {
  const [isTeacher] = useTeacher();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const resetFilters = (e) => {
    e.preventDefault();
    setCategory("All");
    setValue(0);
    setSearch("");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/teach">Teach on eduManage</NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
        </li>
      )}
      {user && isTeacher === "approved" && (
        <li>
          <NavLink to="/dashboard/teacherHome">Dashboard</NavLink>
        </li>
      )}
      {!isAdmin && isTeacher !== "approved" && (
        <li>
          <NavLink to="/dashboard/studentHome">Dashboard</NavLink>
        </li>
      )}
      <li onClick={resetFilters}>
        <NavLink to="/allClasses">All Classes</NavLink>
      </li>
    </>
  );
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    navigate("/allClasses");
  };
  return (
    <div className="navbar relative z-10   justify-between max-w-7xl mx-auto  bg-slate-700 ">
      <div className=" w-1/4  text-white">
        <div className="dropdown z-10">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* icon */}
            <CgMenuLeft className="text-2xl " />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content  rounded-box z-50 mt-3 w-52 p-2 shadow text-white bg-slate-700"
          >
            {navLinks}
          </ul>
        </div>
        <a
          href="/"
          className=" text-xl font-bold rounded-sm text-white px-2 py-1 cursor-pointer"
        >
          eduManage
        </a>
        <div className="flex items-center  gap-3  ">
          <div className="dropdown dropdown-end ml-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://i.ibb.co.com/VWLjs5S/453178253-471506465671661-2781666950760530985-n.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-slate-700 rounded-box z-50 mt-3 w-36 p-2 shadow"
            >
              <li>
                <NavLink to="/dashboard/profile">Prifile</NavLink>
              </li>
              {user && isAdmin && (
                <li>
                  <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
                </li>
              )}
              {user && isTeacher === "approved" && (
                <li>
                  <NavLink to="/dashboard/teacherHome">Dashboard</NavLink>
                </li>
              )}
              {user && !isAdmin && isTeacher !== "approved" && (
                <li>
                  <NavLink to="/dashboard/studentHome">Dashboard</NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink to="/dashboard/studentHome">Dashboard</NavLink>
                </li>
              )}

              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </ul>
          </div>
          <div className=" w-16 text-center  text-white text-base  font-medium">
            {user ? (
              <span className="flex items-center cursor-pointer">
                <a
                  onClick={() => {
                    logout().then();
                  }}
                >
                  Sign out
                </a>
              </span>
            ) : (
              <span className="">
                <NavLink to="/signin">Sign in</NavLink>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2 mx-auto hidden lg:flex justify-center  ml-10 text-white">
        <ul className="flex justify-center gap-4 px-1 text-base  font-medium">
          {navLinks}
        </ul>
      </div>
      {/* search bar */}
      <div className="w-1/4 ml-6 hidden md:flex justify-end  ">
        <form onSubmit={handleSearch}>
          <label className="input input-bordered h-9 rounded-none flex items-center gap-2">
            <input
              type="text"
              name="search"
              className="grow"
              required
              placeholder="Search  for class"
            />
            <button type="submit">
              <IoSearch type="submit" className="text-2xl " />
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
