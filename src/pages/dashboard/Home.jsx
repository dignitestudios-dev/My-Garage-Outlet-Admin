import React from "react";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardUsers from "../../components/dashboard/DashboardUsers";
import DashboardEvents from "../../components/dashboard/DashboardEvents";
import DashboardItems from "../../components/dashboard/DashboardItems";

const Home = () => {
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden w-full p-2 lg:p-6 flex flex-col gap-6 justify-start bg-[#001229]">
      <DashboardStats />
      <DashboardUsers />    
      <DashboardEvents/>  
      <DashboardItems/>
    </div>
  );
};

export default Home;
