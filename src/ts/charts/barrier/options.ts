import {
  Chart,
  ChartOptions,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
} from "chart.js"

Chart.register(LinearScale)
Chart.register(LineController)
Chart.register(PointElement)
Chart.register(LineElement)
Chart.register(Legend)

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
      min: -2e-9,
      max: 2e-9,
      ticks: {
        color: "#FFFFFF",
        font: {
          size: 18,
        },
        display: true,
        callback: (val, _) => {
          if (val === 0) return "0"
          if (val === 0.5e-9) return "a"
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
      max: 6,
      min: -2,
      ticks: {
        color: "#FFFFFF",
        font: {
          size: 18,
        },
        display: true,
        callback: (val, _) => {
          if (val === 4) return "V₀"
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
