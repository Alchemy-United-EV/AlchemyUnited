#!/bin/bash

# Clean startup script for production deployment
echo "[CLEAN-START] Alchemy United deployment initialization..."

# Remove any database processes
pkill -f drizzle 2>/dev/null || true
pkill -f postgres 2>/dev/null || true

# Clear database environment completely
unset DATABASE_URL
unset PGDATABASE
unset PGUSER
unset PGPASSWORD
unset PGHOST
unset PGPORT

export NODE_ENV=production
export PORT=5000

echo "[CLEAN-START] Environment cleaned - starting electric vehicle..."

# Start the application
node dist/index.js