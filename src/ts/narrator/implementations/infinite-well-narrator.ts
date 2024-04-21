import { quantumInfWellChart } from "../../charts/quantum-inf-well/chart"
import { Narrator } from "../narrator"
import { showDatasets, displaySlider } from "../elements-utility"

const chart = quantumInfWellChart
const slider = <HTMLInputElement>document.querySelector(".quantum-total-energy")
const sliderInfo = <HTMLElement>document.querySelector(".info")

const updateCharts = [
  () => {
    showDatasets(chart, false, 0)
    displaySlider(slider, sliderInfo, false)
  },
  () => {
    showDatasets(chart, false, 0)
    displaySlider(slider, sliderInfo, false)
  },
  () => {
    showDatasets(chart, false, 0)
    displaySlider(slider, sliderInfo, false)
  },
  () => {
    showDatasets(chart, false, 0)
    displaySlider(slider, sliderInfo, false)
  },
  () => {
    showDatasets(chart, false, 0)
    displaySlider(slider, sliderInfo, false)
  },
  () => {
    showDatasets(chart, false, 0)
    displaySlider(slider, sliderInfo)
  },
  () => {
    showDatasets(chart, true, 0, 2)
    displaySlider(slider, sliderInfo)
  },
  () => {
    showDatasets(chart, true, 0, 3)
    displaySlider(slider, sliderInfo)
  },
  () => {
    showDatasets(chart, true, 0, 1)
    displaySlider(slider, sliderInfo)
  },
]

updateCharts[0]()
new Narrator(updateCharts)
