import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const Heatmap = ({ activity }) => {
  const data = Object.entries(activity).map(([month, count]) => ({
    date: month,
    count,
  }));

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h3 className="text-lg font-bold mb-4">Monthly Contributions</h3>
      <CalendarHeatmap
        values={data}
        startDate={new Date(2024, 0, 1)} // Adjust as per year
        endDate={new Date(2024, 11, 31)}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default Heatmap;
