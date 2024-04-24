import { Chart } from "chart.js"

export function showDatasets(chart: Chart, animate: boolean, ...indexes: number[]) {
  for (let i = 0; i < chart.data.datasets.length; i++) {
    const hide = !indexes.includes(i)

    chart.getDatasetMeta(i).hidden = hide

    if (hide) {
      chart.data.datasets[i].label! = "none"
    }
  }

  if (animate) chart.update("show")
  else chart.update()
}

export function displaySlider(slider: HTMLInputElement, sliderInfo: HTMLElement, display = true) {
  slider.style.opacity = display ? "1" : "0"
  slider.style.visibility = display ? "visible" : "hidden"
  sliderInfo.style.visibility = display ? "visible" : "hidden"
}

export function displayElement(element: HTMLElement, display = true) {
  element.style.visibility = display ? "visible" : "hidden"
}
