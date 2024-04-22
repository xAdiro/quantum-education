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
          size: 18,
        },
      },
      type: "linear",
      min: -10e-12,
      max: 10e-12,
      ticks: {
        color: "#FFFFFF",
        font: {
          size: 20,
        },
        display: true,
        callback: (val, _) => {
          return `${<number>val * 1e12}pm`
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
      max: 250000,
      min: -250000,
      ticks: {
        color: "#FFFFFF",
        font: {
          size: 20,
        },
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
