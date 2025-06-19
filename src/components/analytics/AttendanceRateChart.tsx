// src/components/analytics/AttendanceRateChart.tsx

import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

// Dummy data
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Registrations",
      data: [12000, 8000, 10000, 24000, 30000, 22000, 25000],
      borderColor: "#6B6B6B",
      backgroundColor: "rgba(0,0,0,0.05)",
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    },
    {
      label: "Attendees",
      data: [7000, 12000, 16000, 10000, 17000, 21000, 28000],
      borderColor: "#93c5fd",
      backgroundColor: "transparent",
      borderDash: [5, 5],
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

// Chart options with correct types
const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 6,
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: {
      type: "category",
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
        },
      },
    },
    y: {
      type: "linear",
      ticks: {
        callback: (value: any) => `${value / 1000}K`,
        font: {
          size: 12,
        },
      },
      grid: {
        color: "#f3f4f6",
      },
    },
  },
};

const AttendanceRateChart: React.FC = () => {
  return (
    <div className="w-full h-full">
      <div className="relative mb-8 h-[310px]">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Event Attendance Rate
        </h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AttendanceRateChart;
