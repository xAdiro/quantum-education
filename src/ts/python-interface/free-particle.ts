import { Point } from "chart.js"
import { Command } from "@tauri-apps/api/shell"

export async function freeData(
  draw: (x0: number, x1: number, re: Point[], im: Point[], psi_sq: Point[]) => void,
  x0: number,
  x1: number,
  m: number,
  v: number,
  h_: number
) {
  const command = new Command("run-python", [
    "python/free_particle.py",
    String(x0),
    String(x1),
    String(m),
    String(v),
    String(h_),
  ])

  command.stdout.on("data", (text) => {
    const data: Record<string, Point[]> = JSON.parse(text)

    draw(x0, x1, data["re"], data["im"], data["psi_sq"])
  })

  command.stderr.on("data", (text) => console.log(text))

  await command.spawn()
}
