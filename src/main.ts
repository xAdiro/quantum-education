import { Command } from '@tauri-apps/api/shell';
// import * as Plotly from 'plotly.js';

const tauriButton = document.querySelector('.tauri');

tauriButton?.addEventListener('click', async () => {
    console.log('Running python...');

    const command = new Command('run-python', [
        'python/infinite-well.py',
        '1',
        '2',
    ]);

    command.stdout.on('data', (line) => {
        const xy: { x: Array<number>; y: Array<number> } = JSON.parse(line);
        console.timeEnd('py-function');
        console.log(xy);
        const trace = {
            x: xy.x,
            y: xy.y,
            mode: 'lines',
            type: 'scatter',
        };

        Plotly.newPlot('plotly-chart', [{ x: xy.x, y: xy.y }], {
            sliders: [
                {
                    pad: { t: 30 },
                    currentvalue: {
                        xanchor: 'right',
                        prefix: 'color: ',
                        font: {
                            color: '#888',
                            size: 20,
                        },
                    },
                    steps: [
                        {
                            label: 'red',
                            method: 'restyle',
                            args: ['line.color', 'red'],
                        },
                        {
                            label: 'green',
                            method: 'restyle',
                            args: ['line.color', 'green'],
                        },
                        {
                            label: 'blue',
                            method: 'restyle',
                            args: ['line.color', 'blue'],
                        },
                    ],
                },
            ],
        });
    });

    // command.on('close', (data) => {
    //     console.log(
    //         `command finished with code ${data.code} and signal ${data.signal}`,
    //     );
    // });
    // command.on('error', (error) => console.error(`command error: "${error}"`));
    // command.stderr.on('data', (line) =>
    //     console.log(`command stderr: "${line}"`),
    // );

    console.time('py-function');
    const child = await command.spawn();
    console.log('pid:', child.pid);
});

function inf_well(a: number, n: number) {
    const x1 = arange((-1.5 * a) / 2, -a / 2, 0.01);
    const x2 = arange(-a / 2, a / 2, 0.01);
    const x3 = arange(a / 2, (1.5 * a) / 2, 0.01);

    const y1 = Array(x1.length).fill(0);
    const y3 = Array(x2.length).fill(0);

    const A = Math.sqrt(2 / a);
    const k = (n * Math.PI) / a;
    let y2;
    if (n % 2 == 0) {
        y2 = x2.map((x) => A * Math.sin(k * x));
    } else {
        y2 = x2.map((x) => A * Math.cos(k * x));
    }

    return { x: x1.concat(x2, x3), y: y1.concat(y2, y3) };
}

function arange(start: number, stop: number, step: number) {
    return Array.from(
        { length: start - stop * step },
        (_, i) => start + step * i,
    );
}

document.querySelector('.js-sin-button')?.addEventListener('click', () => {
    console.time('js-function');
    console.log(inf_well(1, 2));
    console.timeEnd('js-function');
});
