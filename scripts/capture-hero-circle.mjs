import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureHero() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1800));

  // Dark mode hero screenshot
  await page.screenshot({ path: 'hero-circle-dark.png' });
  console.log('Saved hero-circle-dark.png');

  // Toggle theme to light mode
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Switch to"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Light mode hero screenshot
  await page.screenshot({ path: 'hero-circle-light.png' });
  console.log('Saved hero-circle-light.png');

  await browser.close();
}

captureHero().catch(err => {
  console.error(err);
  process.exit(1);
});
