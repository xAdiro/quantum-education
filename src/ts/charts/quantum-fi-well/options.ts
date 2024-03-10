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
          size: 18,
        },
      },
      type: "linear",
      min: -5,
      max: 5,
      ticks: {
        color: "#FFFFFF",
        display: true,
        callback: (val, _) => {
          if (val === -2) return "-a"
          if (val === 2) return "a"
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
      max: 2,
      min: -1,
      ticks: {
        color: "#FFFFFF",
        display: true,
        callback: (val, _) => {
          if (val === 0) return "0"
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
}
