// import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./NavStyle.css";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/teach">Teach on eduManage</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/allClasses">All Classes</NavLink>
      </li>
      <li>
        <NavLink>More</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar justify-between w-full lg:max-w-7xl mx-auto border bg-slate-700">
      <div className=" w-1/4  text-white">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {/* icon */}
            <CgMenuLeft className="text-2xl " />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow text-white bg-slate-700"
          >
            {navLinks}
          </ul>
        </div>
        <a className=" text-3xl font-bold rounded-sm text-white px-2 py-1 ">
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
                  src={user?.photoURL}
                  onError={(e) => {
                    e.target.src =
                      "https://i.ibb.co.com/VWLjs5S/453178253-471506465671661-2781666950760530985-n.png";
                  }}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-slate-700 rounded-box z-[1] mt-3 w-36 p-2 shadow"
            >
              <li>
                <NavLink to="/dashboard/profile">Prifile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
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
      <div className="w-1/4 ml-6 justify-end hidden lg:flex ">
        <label className="input input-bordered h-9 rounded-none flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <IoSearch className="text-2xl " />
        </label>
      </div>
    </div>
  );
};

export default Navbar;
