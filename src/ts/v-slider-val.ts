function vValue(vSlider: HTMLInputElement): number {
  const min = parseFloat(vSlider.min)
  const max = parseFloat(vSlider.max)

  return max - parseFloat(vSlider.value) + min
}
