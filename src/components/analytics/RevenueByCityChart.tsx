// src/components/analytics/RevenueByCityChart.tsx

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const baseData = {
  labels: ["Bangalore", "Delhi", "Mumbai", "Hyderabad"],
  datasets: [
    {
      label: "Revenue Share",
      data: [52.1, 22.8, 13.9, 11.2],
      backgroundColor: [
        "#000000", // This will be replaced with gradient
        "#93c5fd", // Delhi - blue-300
        "#86efac", // Mumbai - green-300
        "#bfdbfe", // Hyderabad - blue-200
      ],
      borderWidth: 4,
      borderColor: "#ffffff",
      cutout: "50%", // donut thickness
      borderRadius: 5,
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // we’re using a custom legend
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.label}: ${context.formattedValue}%`;
        },
      },
    },
  },
};

const legendData = [
  { label: "Bangalore", color: "#000000", value: "52.1%" },
  { label: "Delhi", color: "#93c5fd", value: "22.8%" },
  { label: "Mumbai", color: "#86efac", value: "13.9%" },
  { label: "Hyderabad", color: "#bfdbfe", value: "11.2%" },
];

const RevenueByCityChart: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const getGradient = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "#000000");
    gradient.addColorStop(1, "#6b7280"); // Tailwind gray-500
    return gradient;
  };

  const chartData = React.useMemo(() => {
    if (!canvasRef.current) return baseData;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return baseData;

    const gradient = getGradient(ctx);

    return {
      ...baseData,
      datasets: [
        {
          ...baseData.datasets[0],
          backgroundColor: [gradient, "#93c5fd", "#86efac", "#bfdbfe"],
        },
      ],
    };
  }, [canvasRef.current]);

  return (
    <div className="flex flex-col md:flex-row items-start gap-6 w-full h-[300px]">
      {/* Hidden canvas used to generate gradient */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Chart */}
      <div className="w-full mt-6 ml-8 md:w-1/2">
        <div className="h-[140px] w-[140px]">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>

      {/* Custom Legend */}
      <div className="flex flex-col mt-10 gap-2 text-sm">
        {legendData.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between w-[180px]"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-gray-800">{item.label}</span>
            </div>
            <span className="font-medium text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueByCityChart;
