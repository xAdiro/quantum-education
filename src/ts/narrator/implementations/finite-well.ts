import { quantumFiWellChart } from "../../charts/quantum-fi-well/chart"
import { Narrator } from "../narrator"
import { showDatasets, displaySlider } from "../elements-utility"

const chart = quantumFiWellChart
const slider = <HTMLInputElement>document.querySelector(".quantum-total-energy")
const sliderInfo = <HTMLElement>document.querySelector(".info")

const updateCharts = [
  () => {
    console.log("a")
  },
]

new Narrator(updateCharts)
