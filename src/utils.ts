import { createInterface } from 'node:readline'
import type { Page } from 'playwright'

export async function delay(second: number) {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(), second + getRandomInt(-1000, 1000))
  })
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function waitPage(page: Page, url: string | RegExp | ((url: URL) => boolean)) {
  await page.waitForURL(url, {
    timeout: 120000,
  })
}

export function readInput() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve: (value: string) => void) => {
    rl.once('line', (input) => {
      resolve(input)
      rl.close()
    })
  })
}
