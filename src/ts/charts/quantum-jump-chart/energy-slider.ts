import { quantumJumpCharts } from "./quantum-jump-chart"

const sliders = <NodeListOf<HTMLInputElement>>(
  document.querySelectorAll(".quantum-total-energy")
)

for (let i = 0; i < sliders.length; i++) {
  sliders[i]?.addEventListener("input", () => {
    const min = parseFloat(sliders[i].min)
    const max = parseFloat(sliders[i].max)

    const newEnergy = max - parseFloat(sliders[i].value) + min

    quantumJumpCharts[i].data!.datasets[1]!.data = [
      { x: -5, y: newEnergy },
      { x: 5, y: newEnergy },
    ]
    quantumJumpCharts[i].update()
    console.log(i)
  })
}
