import type { BrowserContext, Page } from 'playwright'
import { chromium } from 'playwright'
import { readdir } from 'node:fs/promises'
import { resolve } from 'path'
import { delay } from './src/utils'

const url = 'https://www.huya.com'

main()

async function main() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
  })
  const files = await readdir(resolve(__dirname, './state'))
  let context: BrowserContext | null = null
  let page: Page | null = null
  process.on('exit', async () => {
    await page?.close()
    await context?.close()
    await browser.close()
  })
  for (const file of files) {
    context = await browser.newContext({
      storageState: `./state/${file}`,
    })
    page = await context.newPage()
    page.goto(url)
    page.waitForSelector('text="点击播放"').then((btn) => {
      btn.click()
    }).catch(() => {
      console.log('未找到播放按钮')
    })
    await delay(15000)
    await context.close()
    await page.close()
    await delay(1000)
  }
  await browser.close()
}
