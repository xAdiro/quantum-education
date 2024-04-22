import { quantumFreeChart } from "../../charts/free-particle/chart"
import { Narrator } from "../narrator"
import { showDatasets, displaySlider } from "../elements-utility"

const chart = quantumFreeChart
const slider = <HTMLInputElement>document.querySelector(".particle-total-energy")
const sliderInfo = <HTMLElement>document.querySelector(".info")

const updateCharts = [() => {}]

new Narrator(updateCharts)
