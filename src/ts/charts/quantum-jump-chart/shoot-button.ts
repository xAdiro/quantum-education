import { quantumJumpCharts } from "./quantum-jump-chart"
import { potentialJumpData } from "../../python-interface/potential-jump"

const sliders = <NodeListOf<HTMLInputElement>>(
  document.querySelectorAll(".quantum-total-energy")
)

const buttons = document.querySelectorAll(".simulate-button")

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", async () => await updateChart(i))
}

async function updateChart(i: number) {
  const min = parseFloat(sliders[i].min)
  const max = parseFloat(sliders[i].max)

  const newEnergy = max - parseFloat(sliders[i].value) + min

  await potentialJumpData(
    (x0, x1, re, im, psiSq) => {
      quantumJumpCharts[i].data!.datasets[2]!.data = re
      quantumJumpCharts[i].data!.datasets[3]!.data = im
      quantumJumpCharts[i].data!.datasets[4]!.data = psiSq
      quantumJumpCharts[i].update("show")
    },
    -5,
    5,
    newEnergy,
    3,
    1
  )
}
