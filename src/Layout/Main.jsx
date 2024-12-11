import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Page/Shared/Navbar";
import { useState } from "react";

const Main = () => {
  const [category, setCategory] = useState("All");
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState("");
  const [classByTeacher, setClassByTeacher] = useState(null);
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("/signin") ||
    location.pathname.includes("/signup");
  return (
    <div>
      {noHeaderFooter || (
        <Navbar
          setValue={setValue}
          setCategory={setCategory}
          setSearch={setSearch}
        ></Navbar>
      )}
      <Outlet
        context={{
          search,
          classByTeacher,
          setClassByTeacher,
          setSearch,
          category,
          setCategory,
          value,
          setValue,
        }}
      ></Outlet>
    </div>
  );
};

export default Main;
