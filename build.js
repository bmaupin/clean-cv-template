const path = require('path');
const puppeteer = require('puppeteer');

// https://superuser.com/a/1250638/93066
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// https://developers.google.com/web/updates/2017/04/headless-chrome#screenshots
(async() => {
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(`file:${path.join(__dirname, 'cv.html')}`);
// Waiting allows time for the remote fonts to load
await timeout(1000);
await page.pdf({path: 'cv.pdf', format: 'letter'});

await browser.close();
})();
