import { classicJumpChart } from "./classic-jump-chart"

export function shootBall() {
  const sliderValue = document.querySelector("#classic-total-energy")

  const newData = {
    label: "none",
    fill: false,
    borderColor: "rgb(255,20,20)",
    tension: 0,
    data: [{ x: -1, y: 2 }],
    pointRadius: 10,
    pointBorderColor: "rgb(100,20,20)",
    pointBackgroundColor: "rgb(255,20,20)",
  }

  classicJumpChart.config.options!.animation! = { duration: 0 }
  classicJumpChart.data.datasets.push(newData)
  classicJumpChart.update()

  let t = 0
  setInterval(() => {
    newData.data[0].x = t - 5
    t += 0.01
    classicJumpChart.update()
  }, 0.1)
}
