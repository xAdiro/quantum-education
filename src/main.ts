import { Command } from '@tauri-apps/api/shell';

const tauriButton = document.querySelector('.tauri');

tauriButton?.addEventListener('click', async () => {
    console.log('Running python...');

    const command = new Command('run-python', ['python/hello.py']);
    command.on('close', (data) => {
        console.log(
            `command finished with code ${data.code} and signal ${data.signal}`,
        );
    });
    command.on('error', (error) => console.error(`command error: "${error}"`));
    command.stdout.on('data', (line) =>
        console.log(`command stdout: "${line}"`),
    );
    command.stderr.on('data', (line) =>
        console.log(`command stderr: "${line}"`),
    );

    const child = await command.spawn();
    console.log('pid:', child.pid);
});
