// Production wrapper for autoscale deployment - CJS format
const path = require('path');

console.log('[DEPLOYMENT] Autoscale production wrapper starting...');
console.log('[DEPLOYMENT] Node version:', process.version);

// Simple dynamic import approach for ESM compatibility
async function startServer() {
  try {
    console.log('[DEPLOYMENT] Loading ESM server...');
    const serverPath = path.join(__dirname, '../dist/index.js');
    await import(serverPath);
  } catch (error) {
    console.error('[DEPLOYMENT][FATAL] Server import failed:', error);
    process.exit(1);
  }
}

// Crash handling
process.on('unhandledRejection', (r) => console.error('[DEPLOYMENT][unhandledRejection]', r));
process.on('uncaughtException', (e) => console.error('[DEPLOYMENT][uncaughtException]', e));

startServer();