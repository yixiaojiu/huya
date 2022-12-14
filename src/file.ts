import { resolve } from 'path'
import { readdir } from 'node:fs/promises'

export async function getNextStateFileName() {
  const rootPath = resolve(__dirname, '../')
  let files: string[] = []
  try {
    files = await readdir(resolve(rootPath, './state'))
  } catch (error) {
    console.log(error)
    return './state/storageState.json'
  }
  if (!files.length) {
    return './state/storageState.json'
  }
  const lastFile = files.pop()
  return `./state/storageState${+lastFile![12] + 1}.json`
}

getNextStateFileName()
