import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressChart = ({ progressData }) => {
  return (
    <section className="progress-chart">
      <h2>Your Progress Over Time</h2>
      <Line data={progressData} />
    </section>
  );
};

export default ProgressChart;
