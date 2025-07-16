import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
// import LatestNewsCard from './LatestNewsCard';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";

gsap.registerPlugin(ScrollTrigger);

const LatestNews = () => {
  const axiosInstance = useAxios();

  const { data: latestNews = [], isLoading } = useQuery({
    queryKey: ["latest-news"],
    queryFn: async () => {
      const res = await axiosInstance.get("/articles/latest");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  

  return (
    <div className="py-24">
      <h1 className="text-5xl font-bold text-center py-12">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-6">
        {latestNews.map((news,i) => (
          <div key={i} className=" p-1 rounded-xl max-w-sm mx-auto mt-8">
            <div className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer h-full">
              <img
                src={news.articlePic}
                alt={news.articleTitle}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 text-white">
                <Link to={`/article/${news?._id}`}><h3 className="text-xl font-bold mb-2">{news.articleTitle}</h3></Link>
                <p className="text-gray-300">
                  {news.descriptions?.slice(0, 60)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
