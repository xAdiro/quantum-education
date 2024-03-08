import { Command } from "@tauri-apps/api/shell"

export async function fiWellData(
  draw: (
    x0: number,
    x1: number,
    re: { x: number; y: number }[][],
    psiSq: { x: number; y: number }[][],
    E: { x: number; y: number }[][]
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
    const data: Record<string, { x: number; y: number }[][]> = JSON.parse(text)

    let energyData: { x: number; y: number }[] = []

    for (let i = 0; i < data["E"].length; i++) {
      energyData.push({ x: x0, y: data["E"][i][0].y })
    }

    draw(x0, x1, data["re"], data["psi_sq"], data["E"])
  })

  await command.spawn()
}
