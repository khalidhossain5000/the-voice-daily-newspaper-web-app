import CountUp from "react-countup";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import useAxios from "../../../Hooks/useAxios";
import { FiUsers } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";

const Statistics = () => {
  const axiosInstance = useAxios();
  const fetchUserStats = async () => {
    const res = await axiosInstance.get("/user-stats");
    return res.data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userStats"],
    queryFn: fetchUserStats,
  });

  if (isLoading) return <Loading />;
  refetch();

  return (
    <div className="py-14 md:py-24 bg-[#f0f2fb] ">
      <h1 className="text-3xl md:text-6xl font-bold text-pink-600 text-center pt-6 pb-12">
        Statistics
      </h1>
      <div className="statiscticcontainer max-w-7xl mx-auto md:flex items-center  gap-12 px-4 lg:px-0 space-y-6 lg:space-y-0">
        <div className="p-3 lg:p-6 shadow-md flex-1 crd-1 bg-white border border-gray-300 rounded-xl space-y-3 lg:space-y-6">
          <FiUsers
            style={{ margin: "auto" }}
            size={90}
            className="text-[#4a3aff]"
          />
          <h2 className="text-[64px] font-extrabold text-center text-[#211f54]">
            <CountUp end={data?.totalUsers} enableScrollSpy={true}></CountUp>+
          </h2>
          <h1 className="text-center text-2xl lg:text-4xl font-bold text-[#211f54]">
            Total Users
          </h1>
        </div>

        <div className="p-3 lg:p-6 shadow-md flex-1 crd-1 bg-white border border-gray-300 rounded-xl space-y-3 lg:space-y-6">
          <FaUserAlt
            style={{ margin: "auto" }}
            size={90}
            className="text-[#4a3aff]"
          />
          <h2 className="text-[64px] font-extrabold text-center text-[#211f54]">
            <CountUp end={data?.normalUsers} enableScrollSpy={true}></CountUp>+
          </h2>
          <h1 className="text-center text-2xl lg:text-4xl font-bold text-[#211f54]">
            Normal Users
          </h1>
        </div>
        <div className="p-3 lg:p-6 shadow-md flex-1 crd-1 bg-white border border-gray-300 rounded-xl space-y-3 lg:space-y-6">
          <MdWorkspacePremium
            style={{ margin: "auto" }}
            size={90}
            className="text-[#4a3aff]"
          />
          <h2 className="text-[64px] font-extrabold text-[#211f54] text-center">
            <CountUp end={data?.premiumUsers} enableScrollSpy={true}></CountUp>+
          </h2>
          <h1 className="text-center text-2xl lg:text-4xl font-bold text-[#211f54]">
            Premium Users
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
