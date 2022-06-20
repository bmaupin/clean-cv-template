const path = require('path');
const puppeteer = require('puppeteer');

const INPUT_EXTENSION = '.html';
const OUTPUT_EXTENSION = '.pdf';

const main = async () => {
  if (process.argv.length !== 3) {
    console.log('Error: Please provide the HTML file path');
    process.exit(1);
  }

  const inputFile = process.argv[2];

  await printToPdf(inputFile);
};

// https://developers.google.com/web/updates/2017/04/headless-chrome#screenshots
async function printToPdf(inputFile) {
  const inputFileUrl = `file://${path.join(__dirname, inputFile)}`;

  const browser = await puppeteer.launch();
  const outputFilename =
    path.basename(inputFileUrl, INPUT_EXTENSION) + OUTPUT_EXTENSION;
  const page = await browser.newPage();

  await page.goto(inputFileUrl);
  // Waiting allows time for the remote fonts to load
  await timeout(1500);
  await page.pdf({
    path: outputFilename,
    // Print background images, used for horizontal lines before section titles
    printBackground: true,
  });

  await browser.close();
}

// https://superuser.com/a/1250638/93066
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main();
