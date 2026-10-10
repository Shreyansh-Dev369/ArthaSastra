import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function parseRgb(colorStr) {
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
  };
}

function getLuminance(rgb) {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(rgb1, rgb2) {
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const brighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (brighter + 0.05) / (darker + 0.05);
}

async function runAudit() {
  console.log('====================================================');
  console.log(' ARTHAŚĀSTRA — STRICT BROWSER VERIFICATION & AUDIT  ');
  console.log('====================================================\n');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  const networkErrors = [];
  const consoleErrors = [];

  page.on('response', res => {
    if (res.status() >= 400) {
      networkErrors.push({ status: res.status(), url: res.url() });
    }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  console.log('1. Loading application at http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // 1. Check Preloader Lifecycle
  const preloaderInit = await page.evaluate(() => {
    const el = document.querySelector('[role="status"]');
    return el ? { exists: true, zIndex: window.getComputedStyle(el).zIndex } : { exists: false };
  });
  console.log('   Initial Preloader Present:', preloaderInit);

  // Wait 1.8s for preloader to cleanly exit
  await new Promise(r => setTimeout(r, 1800));

  const preloaderPost = await page.evaluate(() => {
    const el = document.querySelector('[role="status"]');
    return el ? { exists: true, opacity: window.getComputedStyle(el).opacity } : { exists: false };
  });
  console.log('   Preloader after timeout:', preloaderPost);

  // 2. Measure Dark Mode Contrast & Form Controls
  console.log('\n2. Auditing Dark Mode Contrast & Form Controls...');
  const darkModeStyles = await page.evaluate(() => {
    const bodyStyle = window.getComputedStyle(document.body);
    const ta = document.querySelector('textarea');
    const taStyle = ta ? window.getComputedStyle(ta) : null;
    const inp = document.querySelector('input[type="text"]');
    const inpStyle = inp ? window.getComputedStyle(inp) : null;

    return {
      body: { bg: bodyStyle.backgroundColor, color: bodyStyle.color },
      textarea: taStyle ? { bg: taStyle.backgroundColor, color: taStyle.color } : null,
      input: inpStyle ? { bg: inpStyle.backgroundColor, color: inpStyle.color } : null,
      themeClass: document.documentElement.className,
      dataTheme: document.documentElement.getAttribute('data-theme'),
    };
  });

  const darkBodyRatio = getContrastRatio(parseRgb(darkModeStyles.body.color), parseRgb(darkModeStyles.body.bg));
  const darkTaRatio = darkModeStyles.textarea ? getContrastRatio(parseRgb(darkModeStyles.textarea.color), parseRgb(darkModeStyles.textarea.bg)) : 0;
  const darkInpRatio = darkModeStyles.input ? getContrastRatio(parseRgb(darkModeStyles.input.color), parseRgb(darkModeStyles.input.bg)) : 0;

  console.log('   Dark Theme Body Contrast Ratio:', darkBodyRatio.toFixed(2), ': 1');
  console.log('   Dark Theme Textarea Contrast Ratio:', darkTaRatio.toFixed(2), ': 1');
  console.log('   Dark Theme Input Contrast Ratio:', darkInpRatio.toFixed(2), ': 1');

  await page.screenshot({ path: 'audit-dark-theme.png' });
  console.log('   Captured audit-dark-theme.png');

  // 3. Test Theme Switcher to Light Mode
  console.log('\n3. Testing Theme Switcher to Light Mode...');
  const switchedToLight = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Switch to"]');
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('   Toggle button clicked:', switchedToLight);

  await new Promise(r => setTimeout(r, 400));

  const lightModeStyles = await page.evaluate(() => {
    const bodyStyle = window.getComputedStyle(document.body);
    const ta = document.querySelector('textarea');
    const taStyle = ta ? window.getComputedStyle(ta) : null;
    const inp = document.querySelector('input[type="text"]');
    const inpStyle = inp ? window.getComputedStyle(inp) : null;

    return {
      body: { bg: bodyStyle.backgroundColor, color: bodyStyle.color },
      textarea: taStyle ? { bg: taStyle.backgroundColor, color: taStyle.color } : null,
      input: inpStyle ? { bg: inpStyle.backgroundColor, color: inpStyle.color } : null,
      themeClass: document.documentElement.className,
      dataTheme: document.documentElement.getAttribute('data-theme'),
    };
  });

  const lightBodyRatio = getContrastRatio(parseRgb(lightModeStyles.body.color), parseRgb(lightModeStyles.body.bg));
  const lightTaRatio = lightModeStyles.textarea ? getContrastRatio(parseRgb(lightModeStyles.textarea.color), parseRgb(lightModeStyles.textarea.bg)) : 0;
  const lightInpRatio = lightModeStyles.input ? getContrastRatio(parseRgb(lightModeStyles.input.color), parseRgb(lightModeStyles.input.bg)) : 0;

  console.log('   Light Theme Body Contrast Ratio:', lightBodyRatio.toFixed(2), ': 1');
  console.log('   Light Theme Textarea Contrast Ratio:', lightTaRatio.toFixed(2), ': 1');
  console.log('   Light Theme Input Contrast Ratio:', lightInpRatio.toFixed(2), ': 1');

  await page.screenshot({ path: 'audit-light-theme.png' });
  console.log('   Captured audit-light-theme.png');

  // 4. Test Persistence Across Page Reload
  console.log('\n4. Testing Theme Persistence Across Page Reload...');
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1800));

  const reloadedTheme = await page.evaluate(() => ({
    class: document.documentElement.className,
    dataTheme: document.documentElement.getAttribute('data-theme'),
    savedStorage: localStorage.getItem('arthasastra-theme'),
  }));
  console.log('   Reloaded page theme state:', reloadedTheme);

  // 5. Test Live Input and Text Editing in Dispatch Console
  console.log('\n5. Testing Live Interactive Text Entry in Dispatch Console...');
  const senderInput = await page.$('input[placeholder="e.g. envoy_pataliputra"]');
  if (senderInput) {
    await senderInput.click({ clickCount: 3 });
    await senderInput.type('envoy_ujjain');
  }

  const msgTextarea = await page.$('textarea[placeholder*="royal dispatch"]');
  if (msgTextarea) {
    await msgTextarea.click({ clickCount: 3 });
    await msgTextarea.type('Urgent dispatch: Western garrison reinforced with two divisions.');
  }

  const updatedConsoleValues = await page.evaluate(() => {
    const sender = document.querySelector('input[placeholder="e.g. envoy_pataliputra"]');
    const msg = document.querySelector('textarea[placeholder*="royal dispatch"]');
    return {
      senderValue: sender?.value,
      msgValue: msg?.value,
    };
  });
  console.log('   Console values after user input:', updatedConsoleValues);

  // 6. Test Cryptographic Dispatch Lifecycle (Signing, Verification, Tampering)
  console.log('\n6. Testing End-to-End Cryptographic Dispatch Lifecycle...');

  // Click "Create Authenticated Packet"
  const createdPacket = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Create Authenticated Packet'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('   Clicked "Create Authenticated Packet":', createdPacket);

  await new Promise(r => setTimeout(r, 600));

  // Inspect generated packet status
  const packetStatus = await page.evaluate(() => {
    const badge = document.querySelector('#dispatch span');
    const body = document.body.innerText;
    const hasSealTag = body.includes('HMAC-SHA-256 Authentication Seal Tag');
    return { hasSealTag, textSample: body.substring(body.indexOf('SEAL INTACT'), body.indexOf('SEAL INTACT') + 40) };
  });
  console.log('   Generated Packet Status:', packetStatus);

  // Click "Verify & Process Dispatch"
  const verifiedFirst = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Verify & Process Dispatch') || b.textContent.includes('Verify'));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  });
  console.log('   Clicked "Verify & Process Dispatch":', verifiedFirst);

  await new Promise(r => setTimeout(r, 600));

  const authBadge = await page.evaluate(() => {
    const text = document.body.innerText;
    if (text.includes('AUTHENTIC / INTEGRITY VERIFIED') || text.includes('VERIFIED & AUTHORIZED')) {
      return 'PASS: AUTHENTIC / INTEGRITY VERIFIED';
    }
    return 'Status: ' + text.substring(text.indexOf('Stage 02'), text.indexOf('Stage 02') + 200);
  });
  console.log('   Verification Result:', authBadge);

  // Test Tampering: Click "Alter Body"
  console.log('   Simulating Adversarial Tampering: Clicking "Alter Body"...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Alter Body'));
    if (btn) btn.click();
  });

  await new Promise(r => setTimeout(r, 400));

  // Re-verify after tamper
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Verify & Process Dispatch') || b.textContent.includes('Verify'));
    if (btn) btn.click();
  });

  await new Promise(r => setTimeout(r, 600));

  const tamperBadge = await page.evaluate(() => {
    const text = document.body.innerText;
    if (text.includes('TAMPERED') || text.includes('REJECTED') || text.includes('INTEGRITY FAILURE')) {
      return 'PASS: TAMPER DETECTED & REJECTED BY ZERO-TRUST RECEIVER';
    }
    return 'Unexpected state';
  });
  console.log('   Tamper Verification Result:', tamperBadge);

  await page.screenshot({ path: 'audit-dispatch-verified.png' });
  console.log('   Captured audit-dispatch-verified.png');

  // 7. Test Classical Ciphers Section
  console.log('\n7. Auditing Classical Cipher Lab Controls...');
  const ciphersAudit = await page.evaluate(() => {
    const cipherSection = document.getElementById('ciphers');
    if (!cipherSection) return { exists: false };

    // Click Vigenere button
    const buttons = Array.from(cipherSection.querySelectorAll('button'));
    const vigBtn = buttons.find(b => b.textContent.includes('Vigenère'));
    if (vigBtn) vigBtn.click();

    return { exists: true, clickedVigenere: !!vigBtn };
  });
  console.log('   Classical Ciphers Section State:', ciphersAudit);

  await new Promise(r => setTimeout(r, 400));

  // Check Vigenere key input
  const vigInputExists = await page.evaluate(() => {
    const inp = document.querySelector('input[placeholder="Enter alphabetic keyword..."]');
    return inp ? { exists: true, value: inp.value, color: window.getComputedStyle(inp).color } : { exists: false };
  });
  console.log('   Vigenère Keyword Input:', vigInputExists);

  // 8. Test Cryptanalysis Section
  console.log('\n8. Auditing Cryptanalysis Workbench Controls (Section #analysis)...');
  const cryptanalysisAudit = await page.evaluate(() => {
    const cryptSection = document.getElementById('analysis');
    if (!cryptSection) return { exists: false };
    const textareas = Array.from(cryptSection.querySelectorAll('textarea')).map(ta => ({
      value: ta.value.substring(0, 40) + '...',
      color: window.getComputedStyle(ta).color,
      bg: window.getComputedStyle(ta).backgroundColor,
    }));
    const text = cryptSection.innerText;
    const hasFrequency = text.includes('Frequency') || text.includes('Chi-Square');
    const hasIoC = text.includes('Index of Coincidence') || text.includes('IC');
    return { exists: true, textareas, hasFrequency, hasIoC };
  });
  console.log('   Cryptanalysis Section State:', cryptanalysisAudit);

  // 9. Network & Console Errors Summary
  console.log('\n9. Error Audit Summary:');
  console.log('   Network Errors (4xx/5xx):', networkErrors.length === 0 ? 'ZERO (Clean)' : networkErrors);
  console.log('   Browser Console Errors:', consoleErrors.length === 0 ? 'ZERO (Clean)' : consoleErrors);

  await browser.close();

  console.log('\n====================================================');
  console.log(' ✅ STRICT BROWSER AUDIT VERIFICATION COMPLETE     ');
  console.log('====================================================\n');
}

runAudit().catch(err => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
