#!/bin/bash
# Disable database environment to stop warnings
export DATABASE_URL=""
export PGDATABASE=""
export PGUSER=""
export PGPASSWORD=""
export PGHOST=""
export PGPORT=""

echo "Database environment disabled for electric vehicle deployment"