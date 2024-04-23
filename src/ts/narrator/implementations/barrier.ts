import { quantumBarrierChart } from "../../charts/barrier/chart"
import { Narrator } from "../narrator"
import { showDatasets, displaySlider } from "../elements-utility"

const chart = quantumBarrierChart
const slider = <HTMLInputElement>document.querySelector(".particle-total-energy")
const sliderInfo = <HTMLElement>document.querySelector(".shoot-button")

const updateCharts = [
  () => {
    displaySlider(slider, sliderInfo, false)
    showDatasets(chart, true, 0)
  },
  () => {
    chart.data.datasets[1].label! = "Energia całkowita"
    showDatasets(chart, true, 0, 1)
  },
  () => {},
  () => {},
  () => {
    showDatasets(chart, false, 0, 1)
  },
  () => {
    chart.data.datasets[2].label! = "Re(ψ)"
    chart.data.datasets[3].label! = "Im(ψ)"
    chart.data.datasets[4].label! = "|ψ|²"
    showDatasets(chart, true, 0, 1, 2, 3, 4)
    displaySlider(slider, sliderInfo, false)
  },
  () => {
    displaySlider(slider, sliderInfo)
  },
  () => {},
]

new Narrator(updateCharts)
