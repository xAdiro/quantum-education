import { infWellData } from "../../python-interface/inf-well"
import { vValue } from "../../slider-utility"
import { Chart } from "chart.js"

export function bindSliderToChart(chart: Chart) {
  const slider = <HTMLInputElement>(
    document.querySelector(".quantum-total-energy")
  )

  const info = document.querySelector(".n-value")

  slider.addEventListener("input", async () => {
    const newN = vValue(".quantum-total-energy")
    console.log(newN)

    await infWellData(
      (x0, x1, re, psiSq, E) => {
        chart.data!.datasets[1]!.data = E
        chart.data!.datasets[2]!.data = re
        chart.data!.datasets[3]!.data = psiSq
        chart.update("show")
      },
      -5,
      5,
      4,
      newN
    )

    info!.innerHTML = newN.toString()
  })
}
