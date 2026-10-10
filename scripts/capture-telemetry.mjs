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

  // Scroll 400px down to frame the telemetry metrics
  await page.evaluate(() => window.scrollBy(0, 360));
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: 'hero-telemetry-dark.png' });
  console.log('Saved hero-telemetry-dark.png');

  // Toggle to light mode
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Switch to"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: 'hero-telemetry-light.png' });
  console.log('Saved hero-telemetry-light.png');

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
