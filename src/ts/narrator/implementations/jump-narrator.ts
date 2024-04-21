import { quantumJumpChart } from "../../charts/quantum-jump-chart/quantum-jump-chart"
import { Narrator } from "../narrator"
import { showDatasets, displaySlider } from "../elements-utility"

const chart = quantumJumpChart
const slider = <HTMLInputElement>document.querySelector("")
const sliderInfo = <HTMLElement>document.querySelector("")

const updateCharts = [
  () => {
    showDatasets(chart, false, 0)
    displaySlider(slider, sliderInfo, false)
  },
]

new Narrator(updateCharts)
