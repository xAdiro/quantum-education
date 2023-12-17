import { quantumJumpChart } from "./quantum-jump-chart"
import { data } from "./data"

const slider = <HTMLInputElement>document.querySelector("#quantum-total-energy")

slider?.addEventListener("input", () => {
  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)

  const newEnergy = max - parseFloat(slider.value) + min

  const dataIndex = energyToIndex(newEnergy)

  console.log("eee")
  quantumJumpChart!.data!.datasets[1]!.data = data[dataIndex].E
  quantumJumpChart.update()
})

function energyToIndex(energy: number): number {
  if (energy > 4.9) {
    energy = 4.9
  } else if (energy < 2) {
    energy = 2
  }

  return Math.round((energy - 2) * 10)
}
