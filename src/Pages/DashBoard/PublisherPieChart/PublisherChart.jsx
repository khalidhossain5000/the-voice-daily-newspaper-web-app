import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import Loading from "../../Shared/Loading/Loading";
const barData = [
  ["Status", "Articles"],
  ["Approved", 20],
  ["Pending", 10],
  ["Declined", 5],
];

const areaData = [
  ["Month", "Visitors"],
  ["Jan", 100],
  ["Feb", 300],
  ["Mar", 500],
  ["Apr", 400],
  ["May", 700],
  ["Jun", 1000],
];
const PublisherChart = () => {
  const axiosSecure = useAxiosSecure();
  // 🔄 fetch publisher-wise article count
  const { data = [], isLoading } = useQuery({
    queryKey: ["publisherStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publisher-article-count");
      return res.data;
    },
  });
 
  if (isLoading) return <Loading/>;
  // 🛠️ Pie chart format
  const chartData = [["Publisher", "Articles"]];
  data.forEach((item) => {
    chartData.push([item._id, item.count]);
  });

  const options = {
    title: "Publication-wise Article Percentage",
    is3D: true,
    legend: { position: "right" },
    pieSliceText: "percentage",
    slices: {},
  };

  //bar options
  const barOptions = {
    title: "Article Approval Status",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Articles",
      minValue: 0,
    },
    vAxis: {
      title: "Status",
    },
  };

  //area options
  const areaOptions = {
    title: "Monthly Visitors (Demo)",
    hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "70%", height: "70%" },
  };
  return (
    <div>

      <div className=" flex flex-col lg:flex-row items-center py-12 justify-center gap-6">
        <div className="bg-white p-2 lg:p-4 shadow rounded-xl lg:flex-1 w-11/12 lg:w-full">
        <Chart
          chartType="PieChart"
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />
      </div>
      <div className="w-11/12 lg:w-full lg:flex-1 bg-white shadow-2xl rounded-xl  p-3">
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={barData}
          options={barOptions}
        />
      </div>
      </div>

      <div className="mt-6 lg:mt-22 w-11/12 mx-auto bg-white shadow-2xl rounded-xl   p-3">
        <Chart
          chartType="AreaChart"
          width="100%"
          height="400px"
          data={areaData}
          options={areaOptions}
        />
      </div>
    </div>
  );
};

export default PublisherChart;
