import React, { useEffect, useState } from "react";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardUsers from "../../components/dashboard/DashboardUsers";
import DashboardEvents from "../../components/dashboard/DashboardEvents";
import DashboardItems from "../../components/dashboard/DashboardItems";
import Cookies from "js-cookie";
import Loader from "../../components/global/Loader";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchHomeData = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/home/fetchHomeInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("home data >>>", res?.data);
      setData(res?.data);
    } catch (error) {
      toast.error("Semething went wrong");
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>Something went wrong</h2>;
  }
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden w-full p-2 lg:p-6 flex flex-col gap-6 justify-start bg-[#001229]">
      <DashboardStats homeData={data?.data} />
      <DashboardUsers homeData={data?.data} />
      <DashboardEvents homeData={data?.data} />
      <DashboardItems homeData={data?.data} />
    </div>
  );
};

export default Home;
