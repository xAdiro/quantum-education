export class Narrator {
  private prevButton: HTMLButtonElement
  private forwardButton: HTMLButtonElement
  private max_i: number
  private box_i = 0
  private updateCharts: (() => any)[]

  constructor(updateCharts: (() => any)[]) {
    this.updateCharts = updateCharts

    this.prevButton = <HTMLButtonElement>(
      document.querySelector(".narrator-box__back-button")
    )

    this.forwardButton = <HTMLButtonElement>(
      document.querySelector(".narrator-box__forward-button")
    )

    this.max_i = document.querySelectorAll(".narrator-box__step").length - 1

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

    const newActive = document.querySelectorAll(".narrator-box__step")[
      this.box_i
    ]
    newActive.classList.add("narrator-box__step--active")

    this.updateCharts[this.box_i]()
  }
}
