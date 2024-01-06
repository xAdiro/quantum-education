import { quantumJumpChart } from "./quantum-jump-chart"
import { potentialJumpData } from "../../python-interface/potential-jump"

const button = document.querySelector("#simulate-button")
button?.addEventListener("click", await updateChart)

async function updateChart() {
  const slider = <HTMLInputElement>(
    document.querySelector("#quantum-total-energy")
  )

  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)

  const newEnergy = max - parseFloat(slider.value) + min

  await potentialJumpData(
    (x0, x1, re, im, psiSq) => {
      quantumJumpChart!.data!.datasets[2]!.data = re
      quantumJumpChart!.data!.datasets[3]!.data = im
      quantumJumpChart!.data!.datasets[4]!.data = psiSq
      quantumJumpChart.update("show")
    },
    -5,
    5,
    newEnergy,
    3,
    1
  )
}
