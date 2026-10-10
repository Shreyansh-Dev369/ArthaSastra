import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,1050'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1050 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1800));

  // Dark mode full hero
  await page.screenshot({ path: 'hero-full-dark.png' });
  console.log('Saved hero-full-dark.png');

  // Toggle theme to light mode
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Switch to"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Light mode full hero
  await page.screenshot({ path: 'hero-full-light.png' });
  console.log('Saved hero-full-light.png');

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
