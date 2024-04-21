import { Chart } from "chart.js"

export function showDatasets(
  chart: Chart,
  animate: boolean,
  ...indexes: number[]
) {
  for (let i = 0; i < chart.data.datasets.length; i++) {
    chart.getDatasetMeta(i).hidden = !indexes.includes(i)
  }

  if (animate) chart.update("show")
  else chart.update()
}

export function displaySlider(
  slider: HTMLInputElement,
  sliderInfo: HTMLElement,
  display = true
) {
  slider.style.opacity = display ? "1" : "0"
  sliderInfo.style.opacity = display ? "1" : "0"
}
