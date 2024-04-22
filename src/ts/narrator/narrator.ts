export class Narrator {
  private readonly prevButton: HTMLButtonElement
  private readonly forwardButton: HTMLButtonElement
  private readonly max_i: number
  private readonly updateCharts: (() => any)[]
  private box_i = 0

  constructor(updateCharts: (() => any)[]) {
    this.max_i = document.querySelectorAll(".narrator-box__step").length - 1

    if (updateCharts.length - 1 != this.max_i)
      console.warn(
        `updateCharts must have the same number of elements(${
          updateCharts.length
        }) as there are .narrator-box__step elements(${this.max_i + 1})`
      )

    this.updateCharts = updateCharts

    this.prevButton = <HTMLButtonElement>document.querySelector(".narrator-box__back-button")

    this.forwardButton = <HTMLButtonElement>document.querySelector(".narrator-box__forward-button")

    this.prevButton?.addEventListener("click", () => {
      if (this.box_i > 0) this.box_i--

      this.updateNarrator()
    })

    this.forwardButton?.addEventListener("click", () => {
      if (this.box_i < this.max_i) this.box_i++

      this.updateNarrator()
    })
  }

  private updateNarrator() {
    const oldActive = document.querySelector(".narrator-box__step--active")
    oldActive?.classList.remove("narrator-box__step--active")

    const newActive = document.querySelectorAll(".narrator-box__step")[this.box_i]
    newActive.classList.add("narrator-box__step--active")

    this.updateCharts[this.box_i]()
  }
}
