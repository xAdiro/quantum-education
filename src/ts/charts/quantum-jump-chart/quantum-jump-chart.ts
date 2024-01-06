import Chart, {
  AnimationSpec,
  ChartConfiguration,
  ChartOptions,
} from "chart.js/auto"
import { data } from "./data"
import { ChartTypeRegistry, ScriptableContext } from "chart.js/dist/types"

Chart.defaults.color = "black"

export var quantumJumpChart: Chart
;(async function () {
  const datasets = {
    datasets: [
      {
        label: "Potencjał",
        fill: false,
        borderColor: "rgb(50,50,200)",
        backgroundColor: "rgb(50,50,200)",
        tension: 0,
        data: data[29].V0,
      },
      {
        label: "Energia całkowita",
        fill: false,
        borderColor: "rgb(20, 255, 20)",
        backgroundColor: "rgb(20, 255, 20)",
        tension: 0,
        data: data[29].E,
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
        label: "Im(psi)",
        fill: false,
        borderColor: "rgb(244,51,255)",
        backgroundColor: "rgb(244,51,255)",
        tension: 0.01,
        borderWidth: 5,
        data: [],
      },
      {
        label: "ψ²",
        fill: false,
        borderColor: "#FF8800",
        backgroundColor: "#FF8800",
        tension: 0.01,
        borderWidth: 5,
        data: [],
      },
    ],
  }

  // const totalDuration = 10000
  // const delayBetweenPoints = totalDuration / data.length
  // const previousY = (ctx: ScriptableContext<"line">) =>
  //   ctx.index === 0
  //     ? ctx.chart.scales.y.getPixelForValue(100)
  //     : ctx.chart
  //         .getDatasetMeta(ctx.datasetIndex)
  //         .data[ctx.index - 1].getProps(["y"], true).y

  // const animation: <Animation> ={
  //   x: {
  //     type: "number",
  //     easing: "linear",
  //     duration: delayBetweenPoints,
  //     from: NaN,
  //     delay(ctx: ScriptableContext<ChartTypeRegistry.Line>) {
  //       if (ctx.type !== "data" || ctx.xStarted) {
  //         return 0
  //       }
  //       ctx.xStarted = true
  //       return ctx.index * delayBetweenPoints
  //     },
  //   },
  // }

  const options: ChartOptions = {
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
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          color: "#FFFFFF",
        },
      },
      y: {
        max: 5,
        min: -2,
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
  }

  const config: ChartConfiguration = {
    type: "line",
    data: datasets,
    options: options,
  }

  const chartElement: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById("quantum-jump-chart")!
  )

  quantumJumpChart = new Chart(chartElement, config)
})()
