// Production compatibility wrapper for autoscale deployment
console.log('[DEPLOYMENT] Autoscale production wrapper starting...');

// Import and run the main server
async function startServer() {
  try {
    // Dynamic import for ESM compatibility
    await import('../dist/index.js');
  } catch (error) {
    console.error('[DEPLOYMENT][FATAL] Server import failed:', error);
    process.exit(1);
  }
}

startServer();