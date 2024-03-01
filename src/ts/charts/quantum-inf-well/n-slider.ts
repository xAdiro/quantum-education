import { quantumInfWellChart } from "./chart"
import { infWellData } from "../../python-interface/inf-well"

export { quantumInfWellChart } from "./chart"

const sliders = <NodeListOf<HTMLInputElement>>(
  document.querySelectorAll(".quantum-total-energy")
)

const infos = document.querySelectorAll(".n-value")

for (let i = 0; i < sliders.length; i++) {
  sliders[i]?.addEventListener("input", async () => {
    const min = parseFloat(sliders[i].min)
    const max = parseFloat(sliders[i].max)

    const newN = max - parseFloat(sliders[i].value) + min

    await infWellData(
      (x0, x1, re, psiSq, E) => {
        quantumInfWellChart.data!.datasets[1]!.data = E
        quantumInfWellChart.data!.datasets[2]!.data = re
        quantumInfWellChart.data!.datasets[3]!.data = psiSq
        quantumInfWellChart.update("show")
      },
      -5,
      5,
      4,
      newN
    )

    infos[i].innerHTML = newN.toString()
  })
}
