import { classicJumpChart } from "./classic-jump-chart"

const slider = <HTMLInputElement>document.querySelector("#classic-total-energy")
slider?.addEventListener("input", () => {

    const min = parseFloat(slider.min)
    const max = parseFloat(slider.max)

    const newEnergy = max - parseFloat(slider.value) + min
    classicJumpChart!.data!.datasets[1]!.data = [{ x: -5, y: newEnergy }, { x: 5, y: newEnergy }]
    classicJumpChart.update()
})
