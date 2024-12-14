import { FaBook, FaHome, FaListAlt, FaUserPlus, FaUsers } from "react-icons/fa";
import { FaBarsStaggered, FaCross } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTeacher from "../hooks/useTeacher";
import useAdmin from "../hooks/useAdmin";
import { MdAddToPhotos } from "react-icons/md";
import { BiBook } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const [isTeacher] = useTeacher();
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  return (
    <div className="z-10">
      <Helmet>
        <title>EduManage | Dashboard</title>
      </Helmet>
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
          <div className="flex-1 ">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side z-10">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-[#F5F5F5] text-base-content min-h-full bg-fixed w-72 p-4 text-xl ">
            {user && isAdmin && (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <FaHome className="text-3xl mr-3"></FaHome>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/teacherRequest">
                    <FaListAlt className="text-2xl mr-3"></FaListAlt>
                    Teacher Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allUsers">
                    <FaUsers className="text-3xl mr-3"></FaUsers>
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allClass">
                    <FaBook className="text-2xl mr-3"></FaBook>
                    All Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">
                    <AiOutlineUser className="text-3xl mr-3"></AiOutlineUser>
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            {user && isTeacher === "approved" && (
              <>
                <li>
                  <NavLink to="/dashboard/teacherHome">
                    <FaHome className="text-3xl mr-3" />
                    Teacher Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myClass">
                    <BiBook className="text-3xl mr-3" />
                    My Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addClass">
                    <MdAddToPhotos className="text-3xl mr-3" />
                    Add Class
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/profile">
                    <AiOutlineUser className="text-3xl mr-3" />
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            {user && !isAdmin && isTeacher !== "approved" && (
              <>
                <li>
                  <NavLink to="/dashboard/studentHome">
                    <FaHome className="text-3xl mr-3"></FaHome>
                    Student Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myEnrollClass">
                    <FaUserPlus className="text-3xl mr-3"></FaUserPlus>
                    My enroll class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/profile">
                    <AiOutlineUser className="text-3xl mr-3"></AiOutlineUser>
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            {/* normal routes */}
            <li>
              <NavLink to="/">
                <FaHome className="text-3xl mr-3"></FaHome>
                User Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allClasses">
                <FaBook className="text-2xl mr-3"></FaBook>
                All Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/home">
                <IoIosMail className="text-3xl mr-3"></IoIosMail>
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
