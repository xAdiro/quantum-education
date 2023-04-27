import {
    Chart,
    ChartConfiguration,
    LineController,
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
} from 'chart.js';

Chart.register(
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

export function draw(
    xy: { x: Array<number>; y: Array<number> },
    target: Element | null,
) {
    if (target === null) throw new Error('target is null');

    const data = {
        labels: xy.x,
        datasets: [
            {
                label: 'Studnia',
                data: xy.y,
                fill: false,
                borderColor: 'rgb(51, 204, 255)',
                tension: 0.1,
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
                intersect: false,
            },
            scales: {
                yAxis: {
                    min: -1.5,
                    max: 1.5,
                },
            },
        },
    };

    return new Chart(<HTMLCanvasElement>target, config);
}
