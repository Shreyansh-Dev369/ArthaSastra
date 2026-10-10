import { executeTestSuite } from '../src/lib/testSuite.ts';

// Web Crypto polyfill / native import check
if (!globalThis.crypto?.subtle) {
  const { webcrypto } = await import('node:crypto');
  globalThis.crypto = webcrypto;
}

console.log('====================================================');
console.log(' ARTHAŚĀSTRA — SECURE DISPATCH LAB (TEST HARNESS)  ');
console.log('====================================================\n');

try {
  const results = await executeTestSuite();
  let passed = 0;

  for (const r of results) {
    const status = r.passed ? '✓ PASS' : '✕ FAIL';
    console.log(`${status.padEnd(8)} [${r.category.padEnd(14)}] ${r.title} (${r.durationMs}ms)`);
    if (!r.passed && r.error) {
      console.log(`         ERROR: ${r.error}`);
    }
    if (r.passed) passed++;
  }

  console.log('\n----------------------------------------------------');
  console.log(`TOTAL: ${results.length} | PASSED: ${passed} | FAILED: ${results.length - passed}`);
  console.log('----------------------------------------------------');

  if (passed === results.length) {
    console.log('🎉 ALL 20 INTEGRITY CHECKS PASSED SUCCESSFULLY!\n');
    process.exit(0);
  } else {
    console.error('❌ SOME TESTS FAILED!\n');
    process.exit(1);
  }
} catch (err) {
  console.error('Fatal test error:', err);
  process.exit(1);
}
