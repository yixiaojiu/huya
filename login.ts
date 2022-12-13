import { chromium } from "playwright"

const url = "https://www.huya.com"

start()

async function start() {
  const browser = await chromium.launch({
    channel: "chrome",
  })
  const page = await browser.newPage()
}
