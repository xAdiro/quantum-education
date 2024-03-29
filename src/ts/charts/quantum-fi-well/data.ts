export const data = {
    datasets: [
      {
        label: "Potencjał",
        fill: false,
        borderColor: "rgb(50,50,200)",
        backgroundColor: "rgb(50,50,200)",
        tension: 0,
        data: [
          { x: -2, y: 2 },
          { x: -2, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 2 },
        ],
      },
      {
        label: "Energia całkowita",
        fill: false,
        borderColor: "rgb(20, 255, 20)",
        backgroundColor: "rgb(20, 255, 20)",
        tension: 0,
        data: [],
      },
      {
        label: "Re(psi)",
        fill: false,
        borderColor: "rgb(226,47,47)",
        backgroundColor: "rgb(226,47,47)",
        tension: 0.01,
        borderWidth: 5,
        data: [],
      },
      {
        label: "|ψ|²",
        fill: false,
        borderColor: "#FF8800",
        backgroundColor: "#FF8800",
        tension: 0.01,
        borderWidth: 5,
        data: [],
      },
    ],
  }