import { shootBall } from "./classic-ball"

const button = document.querySelector("#shoot-button")
button?.addEventListener("click", shootBall)
