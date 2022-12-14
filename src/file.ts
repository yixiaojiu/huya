import { resolve } from 'path'
import { readdir } from 'node:fs/promises'

export async function getNextStateFileName() {
  const rootPath = resolve(__dirname, '../')
  let files: string[] = []
  try {
    files = await readdir(resolve(rootPath, './state'))
  } catch (error) {
    console.log(error)
    return './state/storageState1.json'
  }
  if (!files.length) {
    return './state/storageState1.json'
  }
  let onlyNum = files.length + 1
  let fileName = `./state/storageState${onlyNum}.json`
  while (true) {
    if (!files.includes(fileName)) {
      break
    }
    onlyNum++
    fileName = `./state/storageState${onlyNum}.json`
  }
  return fileName
}

getNextStateFileName()
