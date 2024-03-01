import { quantumJumpChart } from "../charts/quantum-jump-chart/quantum-jump-chart"

let box_i = 0
let max_i: number
const chart = quantumJumpChart

document.body.onload = () => {
  document
    .querySelector(".narrator-box__step")
    ?.classList.add("narrator-box__step--active")

  const prevButton = document.querySelector(".narrator-box__back-button")
  const forwardButton = document.querySelector(".narrator-box__forward-button")
  max_i = document.querySelectorAll(".narrator-box__step").length - 1

  prevButton?.addEventListener("click", () => {
    if (box_i > 0) box_i--

    updateNarrator(box_i)
  })

  forwardButton?.addEventListener("click", () => {
    if (box_i < max_i) box_i++

    updateNarrator(box_i)
  })
}

function updateNarrator(step_i: number) {
  const oldActive = document.querySelector(".narrator-box__step--active")
  oldActive?.classList.remove("narrator-box__step--active")

  const newActive = document.querySelectorAll(".narrator-box__step")[box_i]
  newActive.classList.add("narrator-box__step--active")

  updateCharts[step_i]()
}

const updateCharts = [
  () => {
    showDatasets(false, 0)
    displaySlider()
  },
]

updateCharts[0]()

function showDatasets(animate: boolean, ...indexes: number[]) {
  for (let i = 0; i < chart.data.datasets.length; i++) {
    chart.getDatasetMeta(i).hidden = !indexes.includes(i)
  }

  if (animate) chart.update("show")
  else chart.update()
}

function displaySlider(display = true) {
  const slider = <HTMLElement>document.querySelector(".quantum-total-energy")
  const info = <HTMLElement>document.querySelector(".info")

  slider!.style.opacity = display ? "1" : "0"
  info!.style.opacity = display ? "1" : "0"
}
