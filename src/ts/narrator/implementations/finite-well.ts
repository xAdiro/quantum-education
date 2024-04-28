import { quantumFiWellChart } from "../../charts/quantum-fi-well/chart"
import { Narrator } from "../narrator"
import { showDatasets, displaySlider } from "../elements-utility"

const chart = quantumFiWellChart
const slider = <HTMLInputElement>document.querySelector(".quantum-total-energy")
const sliderInfo = <HTMLElement>document.querySelector(".info")

const updateCharts = [
  () => {
    showDatasets(chart, true, 0)
    displaySlider(slider, sliderInfo, false)
  },
  () => {
    chart.data.datasets[1].label! = "Energia całkowita (-W)"

    showDatasets(chart, true, 0, 1)
  },
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {
    displaySlider(slider, sliderInfo, false)
  },
  () => {
    displaySlider(slider, sliderInfo)
    showDatasets(chart, true, 0, 1)
  },
  () => {
    chart.data.datasets[2].label! = "ψ"
    chart.data.datasets[3].label! = "|ψ|²"

    showDatasets(chart, true, 0, 1, 2, 3)
  },
  () => {},
]

new Narrator(updateCharts)
