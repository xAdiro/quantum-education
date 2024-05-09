import { Command } from "@tauri-apps/api/shell"

const pythonDiv = document.querySelector("#python-version")
const pythonErrDiv = document.querySelector("#python-version-err")
const pythonCmd = new Command("run-python", ["-V"])

pythonCmd.stdout.on("data", (data) => {
  const version = data.split(" ")[1]

  const verDetails = version.split(".")

  if (verDetails[0] === "2" || parseInt(verDetails[1]) < 9) {
    pythonDiv!.textContent += " ❌(<3.9)"
  } else {
    pythonDiv!.textContent = ` ✅(znaleziony ${version})`
  }
})

pythonCmd.stderr.on("data", (data) => {
  pythonErrDiv!.textContent = "❌(nie znaleziono)"
})

const numpyDiv = document.querySelector("#numpy-version")
const numpyErrDiv = document.querySelector("#numpy-version-err")
const numpyCmd = new Command("run-python", ["-c", "import numpy"])

numpyCmd.on("close", (data) => {
  const code = data.code

  if (code === 0) {
    numpyDiv!.textContent = "✅"
  } else {
    numpyDiv!.textContent = ""
    numpyErrDiv!.textContent = "❌(nie znaleziono)"
  }
})

document.body.onload = async () => {
  await pythonCmd.spawn()
  await numpyCmd.spawn()
}
