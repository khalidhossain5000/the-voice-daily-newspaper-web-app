
import CountUp from "react-countup";
import { MdGroups3 } from "react-icons/md";
import { MdEmojiPeople } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { RiEdgeNewLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import useAxios from "../../../Hooks/useAxios";


const Statistics = () => {
    const axiosInstance=useAxios()
    const fetchUserStats = async () => {
  const res = await axiosInstance.get("/user-stats");
  return res.data;
};


  const { data, isLoading ,refetch} = useQuery({
    queryKey: ["userStats"],
    queryFn: fetchUserStats,
  });

  if(isLoading) return <Loading/>
  refetch()
  console.log(data);
  return (
    <div className="py-24 max-w-7xl mx-auto">
     
        
        <h1 className="text-6xl font-bold text-pink-600 text-center pt-6 pb-12">
          Our Community In Numbers
        </h1>
    
      <div className="space-y-6 lg:space-y-0 px-3 lg:px-0 py-6 lg:py-20 card-container lg:flex items-center justify-between w-full gap-24">
        
          <div className="w-full p-4 lg:p-6 rounded-2xl bg-gradient-to-br from-[#1171dd] via-[#200633] to-[#d72bba] border border-pink-300 shadow-lg shadow-purple-700 hover:shadow-2xl hover:shadow-purple-300">
            <div className="mx-auto text-center text-pink-200">
              <MdGroups3 style={{ margin: "auto" }} size={90} />
            </div>
            <h2 className="text-[64px] font-extrabold text-center text-pink-100">
              <CountUp end={data?.totalUsers} enableScrollSpy={true}></CountUp>+
            </h2>
            <p className="text-2xl font-semibold text-white">
              Total Users
            </p>
          </div>
       
        
          <div className="w-full p-4 lg:p-6 rounded-2xl bg-gradient-to-br from-[#1171dd] via-[#200633] to-[#d72bba] border border-pink-300 shadow-lg shadow-purple-700 hover:shadow-2xl hover:shadow-purple-300">
            <div className="mx-auto text-center text-pink-200">
              <MdEmojiPeople style={{ margin: "auto" }} size={90} />
            </div>
            <h2 className="text-[64px] font-extrabold text-center text-pink-100">
              <CountUp end={data?.normalUsers} enableScrollSpy={true}></CountUp>+
            </h2>
            <p className="text-2xl font-semibold text-white">
              Normal Users
            </p>
          </div>
     

       
          <div className="w-full  p-4 lg:p-6 rounded-2xl bg-gradient-to-br from-[#1171dd] via-[#200633] to-[#d72bba] border border-pink-300 shadow-lg shadow-purple-700 hover:shadow-2xl hover:shadow-purple-300">
            <div className="mx-auto text-center text-pink-200">
              <BiSolidCategory style={{ margin: "auto" }} size={90} />
            </div>
            <h2 className="text-[64px] font-extrabold text-pink-100 text-center">
              <CountUp end={data?.premiumUsers} enableScrollSpy={true}></CountUp>+
            </h2>
            <p className="text-center text-2xl font-semibold text-white">
              Premium Users
            </p>
          </div>
     

         
        
      </div>
    </div>
  );
};

export default Statistics;