import { chromium } from 'playwright'
import process from 'process'
import { getNextStateFileName } from './src/file'
import { logQRcode } from './src/logQRcode'
import { delay, readInput, waitPage } from './src/utils'

const url = 'https://www.huya.com'

start()

async function start() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
  })
  let context = await browser.newContext()
  let page = await context.newPage()
  process.on('exit', async () => {
    await page.close()
    await context.close()
    await browser.close()
  })
  await page.close()
  await context.close()

  while (true) {
    context = await browser.newContext()
    page = await context.newPage()
    page.goto(url)
    await delay(1000)
    await waitPage(page, url => url.href === 'https://www.huya.com/')
    const loginButton = await page.$('text="登录"')
    await loginButton?.click()
    await page.waitForResponse((res) => {
      return res.url().startsWith('https://udblgn.huya.com/qrLgn/getQrImg')
    })
    await delay(2000)
    const frame = page.frame({
      url: /.*aq.huya.com.*/,
    })
    const img = await frame?.$('#qr-image')
    const imgSrc = (await img?.getAttribute('src'))
    await logQRcode(imgSrc!)
    await page.waitForSelector('a[href="https://i.huya.com/"]')
    await delay(2000)
    console.log('请输入任意字符开始下一个账号')
    await readInput()
    await context.storageState({
      path: await getNextStateFileName(),
    })
    await page.close()
    await context.close()
  }
}
