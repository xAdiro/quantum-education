import { Command } from "@tauri-apps/api/shell"

export async function potentialJumpData(
  draw: (
    x0: number,
    x1: number,
    re: Array<{ x: number; y: number }>,
    im: Array<{ x: number; y: number }>,
    psiSq: Array<{ x: number; y: number }>
  ) => void,
  x0: number,
  x1: number,
  E: number,
  V0: number,
  m: number,
  h_ = 1
) {
  const command = new Command("run-python", [
    "python/potential_jump.py",
    String(x0),
    String(x1),
    String(E),
    String(V0),
    String(m),
    String(h_),
  ])

  command.stdout.on("data", (text) => {
    const data: Record<string, Array<{ x: number; y: number }>> = JSON.parse(
      text
    )

    draw(x0, x1, data["re"], data["im"], data["psi_sq"])
  })
  await command.spawn()
}
