const dt = 0.1
const ballsContainer = document.querySelector(".classic-balls-container")
const centerPx = 443

export function shootBall() {
  const slider = <HTMLInputElement>(
    document.querySelector("#classic-total-energy")
  )
  const min = parseFloat(slider.min)
  const max = parseFloat(slider.max)

  const energy: number = max - Number.parseFloat(slider.value) + min
  const velocity = Math.sqrt(energy)
  const x0 = -5

  const ball = document.createElement("div")
  ball.classList.add("classic-ball")

  const ballPoint = document.createElement("div")
  ballPoint.classList.add("classic-ball-point")
  ballPoint.appendChild(ball)

  ballsContainer?.appendChild(ballPoint)

  const t1 = moveToZero(ball, x0, velocity) * 1000

  if (energy > 5) {
    const newVelocity = Math.sqrt(energy - 5)
    setTimeout(() => moveToEnd(ball, newVelocity, ballPoint), t1)
  } else if (energy < 5) {
    setTimeout(() => moveToStart(ball, velocity, ballPoint), t1)
  }
}

function moveToZero(
  ball: HTMLDivElement,
  from: number,
  velocity: number
): number {
  const time = Math.abs(from) / (velocity * 1.5)

  ball.style.transitionDuration = `${time}s`
  ball.style.transitionTimingFunction = "linear"
  setTimeout(() => {
    ball.style.transform = `translate(${centerPx}px, 0px)`
  }, 0)

  return time
}

function moveToEnd(
  ball: HTMLDivElement,
  velocity: number,
  ballPoint: HTMLDivElement
) {
  const time = Math.abs(5) / (velocity * 1.5)
  ball.style.transitionDuration = `${time}s`

  setTimeout(() => {
    ball.style.transform = `translate(${2 * centerPx}px, 0px)`
  }, 0)

  setTimeout(() => deleteBall(ball, ballPoint), time * 1000)
}

function moveToStart(
  ball: HTMLDivElement,
  velocity: number,
  ballPoint: HTMLDivElement
) {
  const time = 5 / (velocity * 1.5)

  ball.style.transitionDuration = `${time}s`
  setTimeout(() => {
    ball.style.transform = "translate(0px, 0px)"
  }, 0)

  setTimeout(() => deleteBall(ball, ballPoint), time * 1000)
}

function deleteBall(ball: HTMLDivElement, ballPoint: HTMLDivElement) {
  // ball.style.transition = "opacity 0.5s ease-in-out"
  // setTimeout(() => {
  //   ball.style.opacity = "0"
  // }, 0)
  ball.remove()
  ballPoint.remove()
}
