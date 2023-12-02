import { classicJumpChart } from "./classic-jump-chart"

const dt = 0.1

export function shootBall() {
  const slider = <HTMLInputElement>document.querySelector("#classic-total-energy")
  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)

  const energy: number = max - Number.parseFloat(slider.value) + min
  const velocity = Math.sqrt(energy)
  const x0 = -5
  let t = 0

  const newData = {
    label: "none",
    fill: false,
    borderColor: "rgb(255,20,20)",
    tension: 0,
    data: [{ x: x0, y: 2 }],
    pointRadius: 10,
    pointBorderColor: "rgb(100,20,20)",
    pointBackgroundColor: "rgb(255,20,20)",
  }
  classicJumpChart.config.options!.animation! = { duration: 0 }
  classicJumpChart.data.datasets.push(newData)
  classicJumpChart.update()
  classicJumpChart.config.options!.animation! = { duration: 1000 }


  const interval = setInterval(() => {
    console.log(energy)
    const newX = x0 + t * velocity

    if (newX > 0 && energy < 5) {
      newData.data[0].x = -newX
    }
    else if (newX > 0 && energy > 0) {
      newData.data[0].x = t * Math.sqrt(energy - 5)
    }
    else if (newX > 0 && energy === 5) {
      newData.data[0].x = 0
    }
    else {
      newData.data[0].x = newX
    }


    classicJumpChart.update()


    if (newX >= 6) {
      clearInterval(interval)
    }
    else t += dt
  }, 100)
}
