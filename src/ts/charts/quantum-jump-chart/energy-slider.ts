import { quantumJumpChart } from "./quantum-jump-chart"

const slider = <HTMLInputElement>document.querySelector(".quantum-total-energy")

slider?.addEventListener("input", () => {
  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)

  const newEnergy = max - parseFloat(slider.value) + min

  quantumJumpChart.data!.datasets[1]!.data = [
    { x: -5, y: newEnergy },
    { x: 5, y: newEnergy },
  ]
  quantumJumpChart.update()
})
