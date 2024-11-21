import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Page/Shared/Navbar";
import { useState } from "react";

const Main = () => {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("/signin") ||
    location.pathname.includes("/signup");
  return (
    <div>
      {noHeaderFooter || <Navbar setSearch={setSearch}></Navbar>}
      <Outlet context={{ search }}></Outlet>
    </div>
  );
};

export default Main;
