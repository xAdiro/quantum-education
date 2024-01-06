import Chart, { ChartConfiguration, ChartOptions } from "chart.js/auto"

Chart.defaults.color = "black"

export var classicJumpChart: Chart
;(async function () {
  const potential = [
    { x: -5, y: 0.04 },
    { x: 0, y: 0.04 },
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
        borderColor: "rgb(50,50,200)",
        backgroundColor: "rgb(50,50,200)",
        tension: 0,
        data: potential,
      },
      {
        label: "Energia całkowita",
        fill: false,
        borderColor: "rgb(20, 255, 20)",
        backgroundColor: "rgb(20, 255, 20)",
        tension: 0,
        data: energy,
      },
    ],
  }

  const options: ChartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "X",
          color: "#FFFFFF",
          align: "center",
          font: {
            size: 18,
          },
        },
        type: "linear",
        min: -5,
        max: 5,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          color: "#FFFFFF",
        },
      },
      y: {
        max: 7,
        min: 0,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          color: "#FFFFFF",
        },
      },
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
          color: "white",
          font: {
            size: 18,
          },
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
