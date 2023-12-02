import Chart, { ChartConfiguration, ChartOptions } from "chart.js/auto"

export var classicJumpChart: Chart

;(async function () {
  const data1: { x: number; y: number }[] = []

  const potential = [
    { x: -5, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 5 },
    { x: 5, y: 5 },
  ]

  const energy = [
    { x: -5, y: 6 },
    { x: 5, y: 6 },
  ]

  const datasets = {
    datasets: [
      {
        label: "Potencjał",
        fill: false,
        borderColor: "rgb(255,255,255)",
        tension: 0,
        data: potential,
      },
      {
        label: "Energia całkowita",
        fill: false,
        borderColor: "rgb(20, 255, 20)",
        tension: 0,
        data: energy,
      },
      {
        label: "none",
        fill: false,
        borderColor: "rgb(255,20,20)",
        tension: 0,
        data: [{ x: -1, y: 4 }],
        pointRadius: 10,
        pointBorderColor: "rgb(100,20,20)",
        pointBackgroundColor: "rgb(255,20,20)",
      },
    ],
  }

  const options: ChartOptions = {
    scales: {
      x: { type: "linear" },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        labels: {
          filter: (item) => item.text !== "none",
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    hover: {
      mode: undefined,
    },
  }

  const config: ChartConfiguration = {
    type: "line",
    data: datasets,
    options: options,
  }

  const chartElement: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("classic-jump-chart")!
  )

  classicJumpChart = new Chart(chartElement, config)
})()
