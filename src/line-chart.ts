import {
    Chart,
    ChartConfiguration,
    LineController,
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    registerables,
} from 'chart.js';

Chart.register(
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    ...registerables,
);

type plotData = { x: Array<number>; y: Array<number> };

export function draw(
    xy: { x: Array<number>; y: Array<number> },
    target: Element | null,
    a: number,
): Chart {
    if (target === null) throw new Error('target is null');

    const convertedXy = xy.x.map((x, i) => {
        return { x: x, y: xy.y[i] };
    });
    const extremeYVal = Math.max(...xy.y) * 1.2;

    const aData: Array<{ x: number; y: number }> = [];
    aData.push({ x: -a / 2, y: 10 });
    for (let i = -a / 2; i <= a / 2; i += 0.01) {
        aData.push({ x: i, y: 0 });
    }
    aData.push({ x: a / 2, y: 0 });
    aData.push({ x: a / 2, y: 10 });
    console.log(aData);

    const data = {
        labels: xy.x,
        datasets: [
            {
                label: 'P(x)',
                data: convertedXy.map((xy) => {
                    return { x: xy.x, y: xy.y ** 2 };
                }),
                fill: false,
                borderColor: '#ffff66',
                tension: 0.1,
            },
            {
                label: 'Ψ(x)',
                data: convertedXy,
                fill: false,
                borderColor: 'rgb(51, 204, 255)',
                tension: 0.1,
                hidden: true,
            },
            {
                label: 'V(x)',
                data: aData,
                // data: [
                //     { x: -a / 2, y: 10 },
                //     { x: -a / 2, y: 0 },
                //     { x: a / 2, y: 0 },
                //     { x: a / 2, y: 10 },
                // ],
                borderColor: 'rgb(0,255,0)',
            },
        ],
    };

    const config: ChartConfiguration = {
        type: 'line',
        data: data,
        options: {
            elements: {
                point: {
                    radius: 0,
                },
            },
            hover: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    min: -extremeYVal,
                    max: extremeYVal,
                    ticks: {
                        maxTicksLimit: 10,
                    },
                },
                x: {
                    ticks: {
                        maxTicksLimit: 10,
                        callback: (value, index, ticks) =>
                            xy.x[index].toFixed(2),
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                },
            },
        },
    };

    return new Chart(<HTMLCanvasElement>target, config);
}

export function updateWellChart(chart: Chart, newData: plotData): void {
    chart.data.datasets[0].data = newData.x.map((x, i) => {
        return { x: x, y: newData.y[i] ** 2 };
    });
    chart.data.datasets[1].data = newData.x.map((x, i) => {
        return { x: x, y: newData.y[i] };
    });
    chart.update();
}
