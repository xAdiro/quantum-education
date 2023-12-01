import Chart, { ChartConfiguration, ChartOptions } from "chart.js/auto";

(async function () {
  const data1: { x: number; y: number }[] = [];

  const data2 = [
    { x: 1, y: 65 },
    { x: 2, y: 59 },
    { x: 3, y: 80 },
    { x: 7, y: 81 },
    { x: 9, y: 56 },
    { x: 10, y: 55 },
    { x: 18, y: 40 },
  ];

  for (let i = 0; i < 2 * Math.PI; i += 0.05) {
    data1.push({
      x: i,
      y: Math.sin(i),
    });
  }

  const data = {
    datasets: [
      {
        label: "My First Dataset",
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0,
        data: data1,
      },
    ],
  };

  const options: ChartOptions = {
    scales: {
      x: { type: "linear" },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const config: ChartConfiguration = {
    type: "line",
    data: data,
    options: options,
  };

  const chartElement: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("classic-jump-chart")!
  );

  new Chart(chartElement, config);
})();
