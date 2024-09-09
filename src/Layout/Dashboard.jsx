import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
