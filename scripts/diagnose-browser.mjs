import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function diagnose() {
  console.log('=== BROWSER DIAGNOSTIC INVESTIGATION ===\n');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => consoleLogs.push(`[PAGE_ERROR] ${err.message}`));

  console.log('1. Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Check preloader state
  const preloaderInfo = await page.evaluate(() => {
    const preloader = document.querySelector('[role="status"]');
    if (!preloader) return { exists: false };
    const rect = preloader.getBoundingClientRect();
    const computed = window.getComputedStyle(preloader);
    return {
      exists: true,
      display: computed.display,
      visibility: computed.visibility,
      opacity: computed.opacity,
      pointerEvents: computed.pointerEvents,
      zIndex: computed.zIndex,
      rect: { width: rect.width, height: rect.height, top: rect.top, left: rect.left },
    };
  });
  console.log('Preloader state upon load:', preloaderInfo);

  // Wait 2.5 seconds to see if preloader finishes
  console.log('2. Waiting 2.5 seconds for preloader lifecycle...');
  await new Promise(r => setTimeout(r, 2500));

  const preloaderAfter = await page.evaluate(() => {
    const preloader = document.querySelector('[role="status"]');
    if (!preloader) return { exists: false };
    const computed = window.getComputedStyle(preloader);
    return {
      exists: true,
      display: computed.display,
      opacity: computed.opacity,
      pointerEvents: computed.pointerEvents,
      zIndex: computed.zIndex,
    };
  });
  console.log('Preloader state after 2.5s:', preloaderAfter);

  // Check element at center of screen (is something blocking clicks?)
  const elementAtCenter = await page.evaluate(() => {
    const el = document.elementFromPoint(640, 400);
    return el ? { tagName: el.tagName, className: el.className, id: el.id } : null;
  });
  console.log('Element at point (640, 400):', elementAtCenter);

  // Check theme attributes
  const themeInit = await page.evaluate(() => {
    const html = document.documentElement;
    return {
      classes: html.className,
      dataTheme: html.getAttribute('data-theme'),
      colorScheme: html.style.colorScheme,
      bgCanvas: window.getComputedStyle(document.body).backgroundColor,
      textColor: window.getComputedStyle(document.body).color,
    };
  });
  console.log('\n3. Initial Theme state on <html> & <body>:', themeInit);

  // Check all form inputs in Dispatch Console
  const inputsDiagnosis = await page.evaluate(() => {
    const textareas = Array.from(document.querySelectorAll('textarea')).map(ta => {
      const s = window.getComputedStyle(ta);
      return {
        id: ta.id,
        placeholder: ta.placeholder,
        value: ta.value,
        color: s.color,
        backgroundColor: s.backgroundColor,
        opacity: s.opacity,
        pointerEvents: s.pointerEvents,
        disabled: ta.disabled,
        readOnly: ta.readOnly,
        fontSize: s.fontSize,
      };
    });

    const inputs = Array.from(document.querySelectorAll('input')).map(inp => {
      const s = window.getComputedStyle(inp);
      return {
        type: inp.type,
        placeholder: inp.placeholder,
        value: inp.value,
        color: s.color,
        backgroundColor: s.backgroundColor,
        opacity: s.opacity,
        pointerEvents: s.pointerEvents,
        disabled: inp.disabled,
        readOnly: inp.readOnly,
      };
    });

    const selects = Array.from(document.querySelectorAll('select')).map(sel => {
      const s = window.getComputedStyle(sel);
      return {
        value: sel.value,
        color: s.color,
        backgroundColor: s.backgroundColor,
      };
    });

    return { textareas, inputs, selects };
  });
  console.log('\n4. Form Controls Diagnosis:', JSON.stringify(inputsDiagnosis, null, 2));

  // Test typing into textarea
  console.log('\n5. Testing user typing in textarea...');
  try {
    const ta = await page.$('textarea');
    if (ta) {
      await ta.click();
      await ta.type(' [TYPED TEST MESSAGE]');
      const val = await page.evaluate(() => document.querySelector('textarea').value);
      console.log('Textarea value after typing:', val);
    } else {
      console.log('NO TEXTAREA FOUND!');
    }
  } catch (err) {
    console.error('FAILED TO TYPE INTO TEXTAREA:', err.message);
  }

  // Take screenshot in initial theme
  await page.screenshot({ path: 'screenshot-theme-initial.png', fullPage: false });
  console.log('Saved screenshot-theme-initial.png');

  // Test clicking Theme Toggle button
  console.log('\n6. Testing Theme Toggle button click...');
  const themeBtnClicked = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Switch to"]');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('Theme button clicked:', themeBtnClicked);

  await new Promise(r => setTimeout(r, 400));

  const themeAfterToggle = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const ta = document.querySelector('textarea');
    const sBody = window.getComputedStyle(body);
    const sTa = ta ? window.getComputedStyle(ta) : null;
    return {
      classes: html.className,
      dataTheme: html.getAttribute('data-theme'),
      colorScheme: html.style.colorScheme,
      bodyBg: sBody.backgroundColor,
      bodyColor: sBody.color,
      taBg: sTa?.backgroundColor,
      taColor: sTa?.color,
    };
  });
  console.log('Theme state after toggle:', themeAfterToggle);

  await page.screenshot({ path: 'screenshot-theme-toggled.png', fullPage: false });
  console.log('Saved screenshot-theme-toggled.png');

  console.log('\n7. Console Logs captured:', consoleLogs);

  await browser.close();
}

diagnose().catch(err => {
  console.error('Fatal diagnostic error:', err);
  process.exit(1);
});
