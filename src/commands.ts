import { Command } from '@tauri-apps/api/shell';

type plotData = { x: Array<number>; y: Array<number> };

export function getInfiniteWell(a: number, n: BigInt) {
    const command = new Command('run-python', [
        'python/infinite-well.py',
        String(a),
        String(n),
    ]);
    return command;
}
