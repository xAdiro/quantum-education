import { draw, updateWellChart } from './line-chart';
import { Chart } from 'chart.js';

const slider = document.querySelector('#n-setting') as HTMLInputElement;
const target = document.querySelector('#chart');
const a = 2;
let chart: Chart;

type plotData = { x: Array<number>; y: Array<number> };

window.addEventListener('DOMContentLoaded', async () => {
    const text = "";
    const xy: plotData = JSON.parse(text);
    chart = draw(xy, target, a);
});

slider?.addEventListener('input', async () => {
    const text = "";
    const xy: plotData = JSON.parse(text);
    updateWellChart(chart, xy);
});
