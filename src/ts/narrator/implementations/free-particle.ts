import { quantumFreeChart } from "../../charts/free-particle/chart"
import { Narrator } from "../narrator"
import { showDatasets, displaySlider, displayElement } from "../elements-utility"

const chart = quantumFreeChart
const slider = <HTMLInputElement>document.querySelector(".particle-total-energy")
const sliderInfo = <HTMLElement>document.querySelector(".info")
const shootButton = <HTMLElement>document.querySelector(".shoot-button")

const updateCharts = [
  () => {
    showDatasets(chart, false)
    displaySlider(slider, sliderInfo, false)
    displayElement(shootButton, false)
  },
  () => {},
  () => showDatasets(chart, false),
  () => {
    chart.data.datasets[2].label! = "|ψ|²"
    showDatasets(chart, true, 2)
  },
  () => {
    chart.data.datasets[0].label! = "Re(ψ)"
    chart.data.datasets[1].label! = "Im(ψ)"

    showDatasets(chart, true, 0, 1, 2)
    displaySlider(slider, sliderInfo, false)
    displayElement(shootButton, false)
  },
  () => {
    displaySlider(slider, sliderInfo)
    displayElement(shootButton)
  },
]

new Narrator(updateCharts)
