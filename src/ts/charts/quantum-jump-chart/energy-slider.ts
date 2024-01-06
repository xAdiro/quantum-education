import { quantumJumpChart } from "./quantum-jump-chart"

const slider = <HTMLInputElement>document.querySelector("#quantum-total-energy")

slider?.addEventListener("input", () => {
  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)

  const newEnergy = max - parseFloat(slider.value) + min

  const dataIndex = energyToIndex(newEnergy)

  quantumJumpChart!.data!.datasets[1]!.data = [
    { x: -5, y: newEnergy },
    { x: 5, y: newEnergy },
  ]
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
