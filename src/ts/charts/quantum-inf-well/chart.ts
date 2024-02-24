import Chart, { ChartConfiguration, ChartOptions } from "chart.js/auto"
import { infWellData } from "../../python-interface/inf-well"

Chart.defaults.color = "black"

export var quantumInfWellCharts: Chart[] = []
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
          { x: -2, y: 2 },
          { x: -2, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
        ],
      },
      {
        label: "Energia całkowita",
        hidden: true,
        fill: false,
        borderColor: "rgb(20, 255, 20)",
        backgroundColor: "rgb(20, 255, 20)",
        tension: 0,
        data: [],
      },
      {
        label: "Re(ψ)",
        hidden: true,
        fill: false,
        borderColor: "rgb(226,47,47)",
        backgroundColor: "rgb(226,47,47)",
        tension: 0.01,
        borderWidth: 5,
        data: [],
      },
      {
        label: "|ψ|²",
        hidden: true,
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
        // afterUpdate: (axis) => {
        //   axis.ticks = []
        // },
        ticks: {
          color: "#FFFFFF",
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
        max: 2,
        min: -1,
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
  >document.getElementsByClassName("quantum-inf-well-chart")

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

    const newChart = new Chart(chartElements[i], newConfig)
    quantumInfWellCharts.push(newChart)
  }

  await update()
})()

async function update() {
  for (let i = 0; i < quantumInfWellCharts.length; i++) {
    await infWellData(
      (x0, x1, re, psiSq, E) => {
        quantumInfWellCharts[i].data!.datasets[1]!.data = E
        quantumInfWellCharts[i].data!.datasets[2]!.data = re
        quantumInfWellCharts[i].data!.datasets[3]!.data = psiSq
        quantumInfWellCharts[i].update("show")
      },
      -5,
      5,
      4,
      1
    )
  }
}
