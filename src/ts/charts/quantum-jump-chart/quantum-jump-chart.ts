import Chart, { ChartConfiguration, ChartOptions } from "chart.js/auto"
import { potentialJumpData } from "../../python-interface/potential-jump"
import { vValue } from "../../slider-utility"

Chart.defaults.color = "black"

const sliderName = ".quantum-total-energy"
const slider = <HTMLInputElement>document.querySelector(sliderName)

export var quantumJumpChart: Chart
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
        data: [],
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
          color: "#FFFFFF",
          font: {
            size: 20,
          },
          display: true,
          callback: (val, indexes) => {
            if (val === 0) return "0"
            return ""
          },
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
          color: "#FFFFFF",
          font: {
            size: 20,
          },
          display: true,
          callback: (val, indexes) => {
            if (val === 0) return "0"
            if (val === 3) return "V₀"
            return ""
          },
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
    responsive: true,
    maintainAspectRatio: false,
  }

  const config: ChartConfiguration = {
    type: "line",
    data: datasets,
    options: options,
  }

  const chartElement: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementsByClassName("quantum-jump-chart")[0]
  )

  const slider = <HTMLInputElement>document.querySelector(".quantum-total-energy")

  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)
  const newEnergy = max - parseFloat(slider.value) + min

  config.data.datasets[1].data = [
    { x: -5, y: newEnergy },
    { x: 5, y: newEnergy },
  ]

  quantumJumpChart = new Chart(chartElement, config)
})()

async function updateChart() {
  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)

  const newEnergy = vValue(sliderName)

  await potentialJumpData(
    (x0, x1, re, im, psiSq) => {
      quantumJumpChart.data!.datasets[2]!.data = re
      quantumJumpChart.data!.datasets[3]!.data = im
      quantumJumpChart.data!.datasets[4]!.data = psiSq
      quantumJumpChart.update("show")
    },
    -5,
    5,
    newEnergy,
    3,
    1
  )
}

const button = document.querySelector(".simulate-button")

button?.addEventListener("click", async () => await updateChart())

slider?.addEventListener("input", () => {
  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)

  const newEnergy = vValue(sliderName)

  quantumJumpChart.data!.datasets[1]!.data = [
    { x: -5, y: newEnergy },
    { x: 5, y: newEnergy },
  ]
  quantumJumpChart.update()
})
