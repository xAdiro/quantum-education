import { ChartOptions } from "chart.js/auto"

export const options: ChartOptions = {
  scales: {
    x: {
      title: {
        display: true,
        text: "X",
        color: "#FFFFFF",
        align: "center",
        font: {
          size: 24,
        },
      },
      type: "linear",
      min: -3e-9,
      max: 3e-9,
      ticks: {
        color: "#FFFFFF",
        font: {
          size: 18,
        },
        display: true,
        callback: (val, _) => {
          if (val === -1e-9) return "-a/2"
          if (val === 1e-9) return "a/2"
          return ""
        },
      },
      grid: {
        display: false,
      },
      border: {
        color: "#FFFFFF",
      },
    },
    y: {
      title: {
        display: true,
        text: "E",
        color: "#FFFFFF",
        align: "center",
        font: {
          size: 24,
        },
      },
      max: 1.5,
      min: -1.5,
      ticks: {
        color: "#FFFFFF",
        font: {
          size: 18,
        },
        display: true,
        callback: (val, _) => {
          if (val === -1) return "-V₀"
          return ""
        },
      },
      grid: {
        display: false,
      },
      border: {
        color: "#FFFFFF",
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  hover: {
    mode: undefined,
  },
  // animation,
  plugins: {
    legend: {
      labels: {
        filter: (item) => item.text !== "none",
        color: "white",
        font: {
          size: 18,
        },
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
}
