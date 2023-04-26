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

    const child = await command.spawn();
    console.log('pid:', child.pid);
});
