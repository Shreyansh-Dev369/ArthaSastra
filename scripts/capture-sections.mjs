import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1800));

  // Screenshot Ciphers
  const cipherEl = await page.$('#ciphers');
  if (cipherEl) {
    await cipherEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'audit-ciphers.png' });
    console.log('Saved audit-ciphers.png');
  }

  // Screenshot Cryptanalysis
  const analysisEl = await page.$('#analysis');
  if (analysisEl) {
    await analysisEl.scrollIntoView();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'audit-cryptanalysis.png' });
    console.log('Saved audit-cryptanalysis.png');
  }

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
