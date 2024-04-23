import { quantumBarrierChart } from "../../charts/barrier/chart"
import { Narrator } from "../narrator"
import { showDatasets, displaySlider } from "../elements-utility"

const chart = quantumBarrierChart
const slider = <HTMLInputElement>document.querySelector(".particle-total-energy slider")
const sliderInfo = <HTMLElement>document.querySelector(".shoot-button")

const updateCharts = [() => {}]

new Narrator(updateCharts)
