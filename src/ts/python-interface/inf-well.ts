import { Command } from "@tauri-apps/api/shell"
import { Point } from "chart.js"

export async function infWellData(
  draw: (
    x0: number,
    x1: number,
    re: Point[],
    psiSq: Point[],
    E: Point[]
  ) => void,
  x0: number,
  x1: number,
  a: number,
  n: number
) {
  const command = new Command("run-python", [
    "python/infinite_well.py",
    String(x0),
    String(x1),
    String(a),
    String(n),
  ])

  command.stdout.on("data", (text) => {
    const data: Record<string, Point[]> = JSON.parse(text)

    const newEnergy = (Math.pow(Math.PI / a, 2) * Math.pow(n, 2)) / 10
    const energyData = [
      { x: x0, y: newEnergy },
      { x: x1, y: newEnergy },
    ]
    draw(x0, x1, data["re"], data["psi_sq"], energyData)
  })

  await command.spawn()
}
