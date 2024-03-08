import { quantumFiWellChart } from "./chart"
import { infWellData } from "../../python-interface/inf-well"

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
        quantumFiWellChart[i].data!.datasets[1]!.data = E
        quantumFiWellChart[i].data!.datasets[2]!.data = re
        quantumFiWellChart[i].data!.datasets[3]!.data = psiSq
        quantumFiWellChart[i].update("show")
      },
      -5,
      5,
      4,
      newN
    )

    infos[i].innerHTML = newN.toString()
  })
}
