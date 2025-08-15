// Production CJS entry point - single production server
const express = require('express');
const { createServer } = require('http');
const path = require('path');
const fs = require('fs');

const app = express();

// Trust proxy for correct req.ip
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// FIRST route - Health check endpoint
app.get('/api/health', (req, res) => {
  console.log(`[DEPLOYMENT] Health check from ${req.ip || 'unknown'}`);
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'production',
    port: process.env.PORT || '5000'
  });
});

// API request logging
app.use('/api', (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[DEPLOYMENT] ${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
  });
  next();
});

// Minimal API endpoints for production
app.post('/api/analytics/log', (req, res) => {
  console.log('[ANALYTICS] Event logged:', req.body);
  res.status(200).json({ success: true });
});

app.post('/api/early-access-applications', (req, res) => {
  console.log('[FORM] Early access application received');
  res.status(201).json({ success: true, message: 'Application submitted successfully' });
});

app.post('/api/host-applications', (req, res) => {
  console.log('[FORM] Host application received');
  res.status(201).json({ success: true, message: 'Application submitted successfully' });
});

// Serve static client build
const clientPath = path.resolve(__dirname, '../dist/public');
if (fs.existsSync(clientPath)) {
  app.use(express.static(clientPath));
  console.log(`[DEPLOYMENT] Serving static files from ${clientPath}`);
} else {
  console.warn(`[DEPLOYMENT] Client build not found at ${clientPath}`);
}

// SPA fallback - only for non-API requests
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  const indexPath = path.resolve(clientPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Client build not found');
  }
});

// Crash surfacing
process.on('unhandledRejection', r => console.error('[DEPLOYMENT][unhandledRejection]', r));
process.on('uncaughtException', e => console.error('[DEPLOYMENT][uncaughtException]', e));

// Start server
const PORT = Number(process.env.PORT) || 5000;
const server = createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[DEPLOYMENT] Server started on port ${PORT}`);
  console.log(`[DEPLOYMENT] Build timestamp: ${new Date().toISOString()}`);
  console.log(`[DEPLOYMENT] Environment: ${process.env.NODE_ENV || 'production'}`);
});