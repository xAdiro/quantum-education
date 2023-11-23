import { resolveResource } from '@tauri-apps/api/path'
import { readTextFile } from '@tauri-apps/api/fs'


async function getChartData(fileName: string){
    const resourcePath = await resolveResource(`csv/${fileName}.csv`)
    const data = await readTextFile(resourcePath)

    return parseCsv(data)
}

function parseCsv(csvText: string){
    return csvText
}
