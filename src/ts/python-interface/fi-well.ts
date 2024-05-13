import { Command } from "@tauri-apps/api/shell"
import { Point } from "chart.js"
import { diracConstant, electronMass } from "../physics-constants"
import { resolveResource } from "@tauri-apps/api/path"

export async function fiWellData(
  draw: (x0: number, x1: number, re: Point[][], psiSq: Point[][], E: Point[][]) => void,
  x0: number,
  x1: number,
  a: number,
  V0: number
) {
  const path = await resolveResource("python/finite_well.py")
  const command = new Command("run-python", [
    path,
    String(x0),
    String(x1),
    String(a),
    String(V0),
    String(electronMass.kg),
    String(diracConstant.Js),
  ])

  command.stdout.on("data", (text) => {
    const data: Record<string, Point[][]> = JSON.parse(text)

    let energyData: Point[] = []

    for (let i = 0; i < data["E"].length; i++) {
      energyData.push({ x: x0, y: data["E"][i][0].y })
    }

    draw(x0, x1, data["re"], data["psi_sq"], data["E"])
  })

  command.stderr.on("data", (text) => {
    console.log(text)
  })

  await command.spawn()
}
