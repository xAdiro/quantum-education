import Chart, { ChartConfiguration, ChartOptions } from "chart.js/auto"

Chart.defaults.color = "black"

export var quantumJumpCharts: Chart[] = []
;(async function () {
  const datasets = {
    datasets: [
      {
        label: "Potencjał",
        fill: false,
        borderColor: "rgb(50,50,200)",
        backgroundColor: "rgb(50,50,200)",
        tension: 0,
        data: [
          { x: -5, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 3 },
          { x: 5, y: 3 },
        ],
      },
      {
        label: "Energia całkowita",
        fill: false,
        borderColor: "rgb(20, 255, 20)",
        backgroundColor: "rgb(20, 255, 20)",
        tension: 0,
        data: [
          // { x: -5, y: 5 },
          // { x: 5, y: 5 },
        ],
      },
      {
        label: "Re(psi)",
        fill: false,
        borderColor: "rgb(226,47,47)",
        backgroundColor: "rgb(226,47,47)",
        tension: 0.01,
        borderWidth: 5,
        data: [],
      },
      {
        label: "Im(psi)",
        fill: false,
        borderColor: "rgb(244,51,255)",
        backgroundColor: "rgb(244,51,255)",
        tension: 0.01,
        borderWidth: 5,
        data: [],
      },
      {
        label: "ψ²",
        fill: false,
        borderColor: "#FF8800",
        backgroundColor: "#FF8800",
        tension: 0.01,
        borderWidth: 5,
        data: [],
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
        max: 5,
        min: -2,
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
    hover: {
      mode: undefined,
    },
    // animation,
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
  }

  const config: ChartConfiguration = {
    type: "line",
    data: datasets,
    options: options,
  }

  const chartElements: HTMLCollectionOf<HTMLCanvasElement> = <
    HTMLCollectionOf<HTMLCanvasElement>
  >document.getElementsByClassName("quantum-jump-chart")

  const sliders = <NodeListOf<HTMLInputElement>>(
    document.querySelectorAll(".quantum-total-energy")
  )

  for (let i = 0; i < chartElements.length; i++) {
    const min = parseFloat(sliders[i].min)
    const max = parseFloat(sliders[i].max)
    const newEnergy = max - parseFloat(sliders[i].value) + min

    const newConfig = JSON.parse(JSON.stringify(config))
    newConfig.data.datasets[1].data = [
      { x: -5, y: newEnergy },
      { x: 5, y: newEnergy },
    ]

    quantumJumpCharts.push(new Chart(chartElements[i], newConfig))
  }
})()
