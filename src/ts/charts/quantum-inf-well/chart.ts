import { infWellData } from "../../python-interface/inf-well"
import { data } from "./data"
import { options } from "./options"
import { Chart, ChartConfiguration } from "chart.js"
import { bindSliderToChart } from "./n-slider"

Chart.defaults.color = "black"

export var quantumInfWellChart: Chart
;(async function () {
  const config: ChartConfiguration = {
    type: "line",
    data: data,
    options: options,
  }

  const chartElement = <HTMLCanvasElement>(
    document.getElementsByClassName("quantum-inf-well-chart")[0]
  )

  const slider = <HTMLInputElement>(
    document.querySelector(".quantum-total-energy")
  )

  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)
  const newEnergy = max - parseFloat(slider.value) + min

  config.data.datasets[1].data = [
    { x: -5, y: newEnergy },
    { x: 5, y: newEnergy },
  ]

  quantumInfWellChart = new Chart(chartElement, config)

  bindSliderToChart(quantumInfWellChart)

  await update()
})()

async function update() {
  await infWellData(
    (x0, x1, re, psiSq, E) => {
      quantumInfWellChart.data!.datasets[1]!.data = E
      quantumInfWellChart.data!.datasets[2]!.data = re
      quantumInfWellChart.data!.datasets[3]!.data = psiSq
      quantumInfWellChart.update("show")
    },
    -5,
    5,
    4,
    1
  )
}
