import { quantumJumpChart } from "../../charts/quantum-jump-chart/quantum-jump-chart"
import { Narrator } from "../narrator"
import { showDatasets, displaySlider } from "../elements-utility"

const chart = quantumJumpChart
const slider = <HTMLInputElement>document.querySelector(".quantum-total-energy")
const sliderInfo = <HTMLElement>document.querySelector(".simulate-button")

const updateCharts = [
  () => {
    showDatasets(chart, true, 0)
    displaySlider(slider, sliderInfo, false)
  },

  () => {
    showDatasets(chart, false, 0, 1)
  },
  () => {
    showDatasets(chart, false, 0, 1)
  },

  () => {
    chart.data.datasets[2].label! = "Re(ψ)"
    chart.data.datasets[3].label! = "Im(ψ)"
    chart.data.datasets[4].label! = "|ψ|²"
    showDatasets(chart, true, 0, 1, 2, 3, 4)
  },
  () => {
    displaySlider(slider, sliderInfo, false)
  },
  () => {
    displaySlider(slider, sliderInfo)
  },
]

new Narrator(updateCharts)
