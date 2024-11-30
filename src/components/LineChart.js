import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data.activity),
    datasets: [
      {
        label: "XP Progress",
        data: Object.values(data.activity).map((count) => count * 20),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
