import { Command } from "@tauri-apps/api/shell"
import { diracConstant } from "../physics-constants"

export async function barrierData(
  draw: (
    x0: number,
    x1: number,
    re: Array<{ x: number; y: number }>,
    im: Array<{ x: number; y: number }>,
    psiSq: Array<{ x: number; y: number }>
  ) => void,
  x0: number,
  x1: number,
  a: number,
  E: number,
  V0: number,
  m: number
) {
  const command = new Command("run-python", [
    "python/potential_barrier.py",
    String(x0),
    String(x1),
    String(a),
    String(E),
    String(V0),
    String(m),
    String(diracConstant.Js),
  ])

  command.stdout.on("data", (text) => {
    const data: Record<string, Array<{ x: number; y: number }>> = JSON.parse(
      text
    )

    draw(x0, x1, data["re"], data["im"], data["psi_sq"])
  })

  command.stderr.on("data", (text) => console.log(text))
  await command.spawn()
}
