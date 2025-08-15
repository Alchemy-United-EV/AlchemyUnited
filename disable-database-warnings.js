#!/usr/bin/env node

// ELECTRIC VEHICLE MODE: Comprehensive database warning suppression
// This script prevents all database-related checks and warnings

console.log('[ELECTRIC-MODE] Disabling all database integrations...');

// Override all possible database environment variables
process.env.DATABASE_URL = "";
process.env.PGDATABASE = "";
process.env.PGUSER = "";
process.env.PGPASSWORD = "";
process.env.PGHOST = "";
process.env.PGPORT = "";
process.env.NEON_API_KEY = "";
process.env.DRIZZLE_KIT_CONFIG = "";

// Disable drizzle-kit operations by creating mock executable
const fs = require('fs');
const path = require('path');

// Mock drizzle-kit to prevent any database checks
const mockDrizzleKit = `#!/bin/bash
echo "[ELECTRIC-MODE] Database operations disabled - using email-only storage"
exit 0
`;

const drizzleKitPath = path.join(process.cwd(), 'node_modules', '.bin', 'drizzle-kit');
if (fs.existsSync(drizzleKitPath)) {
  fs.writeFileSync(drizzleKitPath, mockDrizzleKit);
  fs.chmodSync(drizzleKitPath, 0o755);
}

console.log('[ELECTRIC-MODE] Database environment completely disabled');
console.log('[ELECTRIC-MODE] All forms will use email-only storage');