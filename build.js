const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const INPUT_EXTENSION = '.html';
const OUTPUT_EXTENSION = '.pdf';

// https://superuser.com/a/1250638/93066
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// https://developers.google.com/web/updates/2017/04/headless-chrome#screenshots
async function printToPdf(browser, inputUrl) {
  const outputFilename = path.basename(inputUrl, INPUT_EXTENSION) + OUTPUT_EXTENSION;
  const page = await browser.newPage();

  await page.goto(inputUrl);
  // Waiting allows time for the remote fonts to load
  await timeout(1500);
  await page.pdf({
    path: outputFilename,
    // Print background images, used for horizontal lines before section titles
    printBackground: true
  });
}

async function printFilesToPdf(files) {
  const browser = await puppeteer.launch();

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    if (filename.endsWith(INPUT_EXTENSION)) {
      await printToPdf(browser, `file:${path.join(__dirname, filename)}`);
    }
  }
  await browser.close();
}

function getFilesInCwd() {
  return new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, files) => {
      if (err) reject(err);
      resolve(files);
    })
  })
}

(async() => {
  const filesInCwd = await getFilesInCwd();
  await printFilesToPdf(filesInCwd);
})();
