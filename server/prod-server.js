// Production wrapper for autoscale - handles ESM/CJS compatibility
const path = require('path');
const { spawn } = require('child_process');

console.log('[DEPLOYMENT] Autoscale production wrapper starting...');
console.log('[DEPLOYMENT] Node version:', process.version);
console.log('[DEPLOYMENT] Environment:', process.env.NODE_ENV || 'production');

// Start the ESM server with Node ESM loader
const serverPath = path.join(__dirname, '../dist/index.js');
const nodeArgs = ['--input-type=module', '--experimental-loader', 'data:text/javascript,export function resolve(specifier, context, defaultResolve) { return defaultResolve(specifier, context); }'];

const server = spawn('node', [...nodeArgs, serverPath], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

server.on('error', (err) => {
  console.error('[DEPLOYMENT][FATAL] Server spawn failed:', err);
  process.exit(1);
});

server.on('exit', (code, signal) => {
  console.log(`[DEPLOYMENT] Server exited with code ${code}, signal ${signal}`);
  process.exit(code);
});

// Graceful shutdown
['SIGTERM', 'SIGINT'].forEach(signal => {
  process.on(signal, () => {
    console.log(`[DEPLOYMENT] Received ${signal}, shutting down`);
    server.kill(signal);
  });
});