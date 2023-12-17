import { quantumJumpChart } from "./quantum-jump-chart"
import { data } from "./data"

const button = document.querySelector("#simulate-button")
button?.addEventListener("click", updateChart)

function updateChart() {
  const slider = <HTMLInputElement>(
    document.querySelector("#quantum-total-energy")
  )

  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)

  const newEnergy = max - parseFloat(slider.value) + min

  const dataIndex = energyToIndex(newEnergy)

  quantumJumpChart!.data!.datasets[1]!.data = data[dataIndex].E
  quantumJumpChart!.data!.datasets[2]!.data = data[dataIndex].re
  quantumJumpChart!.data!.datasets[3]!.data = data[dataIndex].im
  quantumJumpChart!.data!.datasets[4]!.data = data[dataIndex]["psi^2"]
  quantumJumpChart.update("show")
}

function energyToIndex(energy: number): number {
  if (energy > 4.9) {
    energy = 4.9
  } else if (energy < 2) {
    energy = 2
  }

  return Math.round((energy - 2) * 10)
}
