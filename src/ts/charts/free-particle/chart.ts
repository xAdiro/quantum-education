import { Chart, ChartConfiguration } from "chart.js"
import { data } from "./data"
import { options } from "./options"
import { freeData } from "../../python-interface/free-particle"
import { vValue } from "../../slider-utility"
import { electronMass, diracConstant } from "../../physics-constants"

const sliderName = ".particle-total-energy"
const buttonName = ".shoot-button"

export var quantumFreeChart: Chart
;(async function () {
  const config: ChartConfiguration = {
    type: "line",
    data: data,
    options: options,
  }

  const chartElement: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementsByClassName("quantum-free-particle")[0]
  )

  quantumFreeChart = new Chart(chartElement, config)

  await update()
})()

async function update() {
  const v = vValue(sliderName)

  await freeData(
    (x0, x1, re, im, psiSq) => {
      quantumFreeChart.data!.datasets[0]!.data = re
      quantumFreeChart.data!.datasets[1]!.data = im
      quantumFreeChart.data!.datasets[2]!.data = psiSq

      quantumFreeChart.update()
    },
    -10e-9,
    10e-9,
    electronMass.kg,
    v,
    diracConstant.Js
  )
}

const button = <HTMLButtonElement>document.querySelector(buttonName)
button.addEventListener("click", () => update())

const slider = <HTMLInputElement>document.querySelector(sliderName)
slider.addEventListener(
  "input",
  () =>
    (document.querySelector(".info__val")!.innerHTML = String(
      Math.floor(vValue(sliderName) / 1_000)
    ))
)
