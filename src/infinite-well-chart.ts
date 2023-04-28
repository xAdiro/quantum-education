import { draw, updateWellChart } from './line-chart';
import { getInfiniteWell } from './commands';
import { Chart } from 'chart.js';

const slider = document.querySelector('#n-setting') as HTMLInputElement;
const target = document.querySelector('#chart');
const a = 2;
let chart: Chart;

type plotData = { x: Array<number>; y: Array<number> };

window.addEventListener('DOMContentLoaded', async () => {
    const command = getInfiniteWell(a, BigInt(1));
    command.stdout.on('data', (text) => {
        const xy: plotData = JSON.parse(text);
        chart = draw(xy, target, a);
    });
    await command.spawn();
});

slider?.addEventListener('input', async () => {
    const n = slider.value;
    const command = getInfiniteWell(a, BigInt(n));

    command.stdout.on('data', (text) => {
        const xy: plotData = JSON.parse(text);

        updateWellChart(chart, xy);
    });
    await command.spawn();
});
