export function vValue(vSliderName: string) {
  const vSlider = <HTMLInputElement>document.querySelector(vSliderName)
  const min = parseFloat(vSlider.min)
  const max = parseFloat(vSlider.max)

  return max - parseFloat(vSlider.value) + min
}

export function setRange(vSliderName: string, min: number, max: number) {
  const slider = <HTMLInputElement>document.querySelector(vSliderName)

  slider.max = String(max)
  slider.min = String(min)
}
