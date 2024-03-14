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
      min: -5,
      max: 5,
      ticks: {
        color: "#FFFFFF",
        display: true,
        callback: (val, _) => {
          if (val === -2) return "-a/2"
          if (val === 2) return "a/2"
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
        display: false,
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
