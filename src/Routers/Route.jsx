import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import SignUp from "../Page/SignUp/SignUp";
import SignIn from "../Page/SignIn/SignIn";
import Home from "../Page/Home/Home";
import AllClasses from "../Page/AllClasses/AllClasses";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Page/Dashboard/AllUsers";
import TeachFrom from "../Page/TeachForm/TeachFrom";
import TeacherRequest from "../Page/TeacherRequest/TeacherRequest";

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
        element: <TeachFrom></TeachFrom>,
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
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
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "teacherRequest",
        element: <TeacherRequest></TeacherRequest>,
      },
    ],
  },
]);

export default router;
