import Chart, { ChartConfiguration } from "chart.js/auto"
import { fiWellData } from "../../python-interface/fi-well"
import { data } from "./data"
import { options } from "./options"
import { vValue, setRange } from "../../slider-utility"
import { Point } from "chart.js"

const sliderName = ".quantum-total-energy"
Chart.defaults.color = "black"
var En: Point[][] = []
var Ren: Point[][] = []
var Psi_sqn: Point[][] = []

export var quantumFiWellChart: Chart
;(async function () {
  const config: ChartConfiguration = {
    type: "line",
    data: data,
    options: options,
  }

  const chartElement: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementsByClassName("quantum-fi-well-chart")[0]
  )

  quantumFiWellChart = new Chart(chartElement, config)
  await calcData()
})()

async function calcData() {
  await fiWellData(
    (x0, x1, re, psiSq, E) => {
      En = E
      scaleDown(En, 1.6e-19)
      Ren = re
      Psi_sqn = psiSq
      setRange(".quantum-total-energy", 0, En.length - 1)
      updateChart()
    },
    -3e-9,
    3e-9,
    2e-9, //4
    1.6e-19
  )
}

function updateChart() {
  const i = vValue(sliderName)
  quantumFiWellChart.data!.datasets[1]!.data = En[i]
  quantumFiWellChart.data!.datasets[2]!.data = Ren[i]
  quantumFiWellChart.data!.datasets[3]!.data = Psi_sqn[i]
  quantumFiWellChart.update("show")
}

function scaleDown(data: Point[][], factor: number) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      data[i][j].y /= factor
    }
  }
}

const energySlider = <HTMLInputElement>document.querySelector(".quantum-total-energy")

const info = document.querySelector(".info__val")

energySlider.addEventListener("input", () => {
  updateChart()
  info!.innerHTML = String(vValue(sliderName) + 1)
})
