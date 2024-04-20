import { Chart, ChartConfiguration, Point } from "chart.js"
import { data } from "./data"
import { options } from "./options"
import { barrierData } from "../../python-interface/barrier"
import { vValue } from "../../slider-utility"
import { electronMass, diracConstant } from "../../physics-constants"

const sliderName = ".particle-total-energy"
const buttonName = ".shoot-button"

var quantumBarrierChart: Chart
;(async function () {
  const config: ChartConfiguration = {
    type: "line",
    data: data,
    options: options,
  }

  const chartElement: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementsByClassName("quantum-barrier-chart")[0]
  )

  quantumBarrierChart = new Chart(chartElement, config)

  await update()
})()

async function update() {
  const v = vValue(sliderName) * 1.6e-19
  console.log(v)

  await barrierData(
    (x0, x1, re, im, psiSq) => {
      quantumBarrierChart.data!.datasets[2]!.data = re
      quantumBarrierChart.data!.datasets[3]!.data = im
      quantumBarrierChart.data!.datasets[4]!.data = psiSq

      quantumBarrierChart.update()
    },
    -2e-9,
    2e-9,
    0.5e-9,
    v,
    1.6e-19,
    electronMass.kg
  )
}

const button = <HTMLButtonElement>document.querySelector(buttonName)
button.addEventListener("click", () => update())

const slider = <HTMLInputElement>document.querySelector(sliderName)

slider?.addEventListener("input", () => {
  const newEnergy = vValue(sliderName) * 3

  quantumBarrierChart.data!.datasets[1]!.data = [
    { x: -5, y: newEnergy },
    { x: 5, y: newEnergy },
  ]
  quantumBarrierChart.update()
})
