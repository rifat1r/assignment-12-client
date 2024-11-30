import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import SignUp from "../Page/SignUp/SignUp";
import SignIn from "../Page/SignIn/SignIn";
import AllClasses from "../Page/AllClasses/AllClasses";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Page/Dashboard/AllUsers";
import TeachFrom from "../Page/TeachForm/TeachFrom";
import TeacherRequest from "../Page/TeacherRequest/TeacherRequest";
import AddClass from "../Page/AddClass/AddClass";
import AllClass from "../Page/Dashboard/AllClass";
import MyClass from "../Page/Dashboard/MyClass";
import ClassDetails from "../Page/ClassDetails/ClassDetails";
import Payment from "../Page/Dashboard/Payments/Payment";
import MyEnrollClass from "../Page/Dashboard/MyEnrollClass";
import MyEnrollClassDetails from "../Page/Dashboard/MyEnrollClassDetails";
import MyClassDetails from "../Page/Dashboard/MyClass/MyClassDetails";
import SeeProgress from "../Page/Dashboard/SeeProgress";
import Home from "../Page/Home/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Components/Profile";
import AdminRoute from "./AdminRoute";
import TeacherRoute from "./TeacherRoute";
import AdminHome from "../Page/Dashboard/AdminHome/AdminHome";
import TeacherHome from "../Page/Dashboard/TeacherHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/teach",
        element: (
          <PrivateRoute>
            <TeachFrom></TeachFrom>
          </PrivateRoute>
        ),
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
      {
        path: "/allClass/:id",
        element: (
          <PrivateRoute>
            <ClassDetails></ClassDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //admin routes
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "teacherRequest",
        element: (
          <AdminRoute>
            <TeacherRequest></TeacherRequest>
          </AdminRoute>
        ),
      },
      {
        path: "allClass",
        element: (
          <AdminRoute>
            <AllClass></AllClass>
          </AdminRoute>
        ),
      },
      {
        path: "progress",
        element: (
          <AdminRoute>
            <SeeProgress></SeeProgress>
          </AdminRoute>
        ),
      },
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },

      // teachers routes
      {
        path: "teacherHome",
        element: <TeacherHome></TeacherHome>,
      },
      {
        path: "addClass",
        element: (
          <TeacherRoute>
            <AddClass></AddClass>
          </TeacherRoute>
        ),
      },

      {
        path: "myClass",
        element: (
          <TeacherRoute>
            <MyClass></MyClass>
          </TeacherRoute>
        ),
      },
      {
        path: "myClass/:id",
        element: (
          <TeacherRoute>
            <MyClassDetails></MyClassDetails>
          </TeacherRoute>
        ),
      },
      // student routes
      {
        path: "myEnrollClass",
        element: <MyEnrollClass></MyEnrollClass>,
      },
      {
        path: "myEnrollClassDetails/:id",
        element: <MyEnrollClassDetails></MyEnrollClassDetails>,
      },
    ],
  },
]);

export default router;
