import { Command } from "@tauri-apps/api/shell"

export async function fiWellData(
  draw: (
    x0: number,
    x1: number,
    re: Array<{ x: number; y: number }>,
    psiSq: Array<{ x: number; y: number }>,
    E: Array<{ x: number; y: number }>
  ) => void,
  x0: number,
  x1: number,
  a: number,
  V0: number
) {
  const command = new Command("run-python", [
    "python/finite_well.py",
    String(x0),
    String(x1),
    String(a),
    String(V0),
  ])

  command.stdout.on("data", (text) => {
    const data: Record<string, Array<{ x: number; y: number }>> = JSON.parse(
      text
    )

    const energyData = [
      { x: x0, y: data["E"]["n1"][0] },
      { x: x1, y: data["E"]["n1"][0] },
    ]
    draw(x0, x1, data["re"], data["psi_sq"], energyData)
  })

  await command.spawn()
}
