import Chart, { ChartConfiguration, ChartOptions } from "chart.js/auto"
import { fiWellData } from "../../python-interface/fi-well"
import { E } from "@tauri-apps/api/shell-efff51a2"
import { n } from "@tauri-apps/api/fs-9d7de754"

Chart.defaults.color = "black"
var En: { x: number; y: number }[][] = []
var Ren: { x: number; y: number }[][] = []
var Psi_sqn: { x: number; y: number }[][] = []

export var quantumFiWellChart: Chart
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
        label: "|ψ|²",
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

  const chartElement: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementsByClassName("quantum-fi-well-chart")[0]
  )

  const newEnergy = getSliderVal()
  config.data.datasets[1].data = [
    { x: -5, y: newEnergy },
    { x: 5, y: newEnergy },
  ]

  const newChart = new Chart(chartElement, config)
  quantumFiWellChart = newChart

  await calcData().then(() => console.log(En))
  setSlider()
  updateChart()
})()

async function calcData() {
  await fiWellData(
    (x0, x1, re, psiSq, E) => {
      En = E
      Ren = re
      Psi_sqn = psiSq
      quantumFiWellChart.update("show")
    },
    -5,
    5,
    4,
    1000
  )
}

function updateChart() {
  const i = getSliderVal() - 1
  quantumFiWellChart.data!.datasets[1]!.data = En[i]
  quantumFiWellChart.data!.datasets[2]!.data = Ren[i]
  quantumFiWellChart.data!.datasets[3]!.data = Psi_sqn[i]
  quantumFiWellChart.update("show")
}

function setSlider() {
  const slider = <HTMLInputElement>(
    document.querySelector(".quantum-total-energy")
  )
  slider.max = String(En.length)
  slider.min = String("0")
}

function getSliderVal(): number {
  const slider = <HTMLInputElement>(
    document.querySelector(".quantum-total-energy")
  )

  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)
  const val = max - parseFloat(slider.value) + min

  return val
}
