import { FaBook, FaHome, FaListAlt, FaUserPlus, FaUsers } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTeacher from "../hooks/useTeacher";
import useAdmin from "../hooks/useAdmin";
import { MdAddToPhotos } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

const Dashboard = () => {
  const [isTeacher] = useTeacher();
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  return (
    <div className="">
      <div className="drawer md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
          <div className="flex-none md:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* icon */}
              <FaBarsStaggered className="text-xl"></FaBarsStaggered>
            </label>
          </div>
          <div className="flex-1 p-8">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-blue-200 text-base-content min-h-full w-60 p-4">
            {/* Sidebar content here */}
            {user && isAdmin && (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <FaHome></FaHome>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/teacherRequest">
                    <FaListAlt></FaListAlt>
                    Teacher Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allUsers">
                    <FaUsers></FaUsers>
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allClass">
                    <FaBook></FaBook>
                    All Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">
                    <AiOutlineUser className="text-xl"></AiOutlineUser>
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            {user && isTeacher === "approved" && (
              <>
                <li>
                  <NavLink to="/dashboard/addClass">
                    <MdAddToPhotos className="text-xl" />
                    Add Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myClass">
                    <BiBook className="text-xl" />
                    My Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">
                    <AiOutlineUser className="text-xl" />
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            {user && !isAdmin && isTeacher !== "approved" && (
              <>
                <li>
                  <NavLink to="/dashboard/myEnrollClass">
                    <FaUserPlus className="text-xl"></FaUserPlus>
                    My enroll class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">
                    <AiOutlineUser className="text-xl"></AiOutlineUser>
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            {/* normal routes */}
            <li>
              <NavLink to="/">
                <FaHome className="text-xl"></FaHome>
                User Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allClasses">
                <FaBook className="text-lg"></FaBook>
                All Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/home">
                <IoIosMail className="text-xl"></IoIosMail>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
