#!/usr/bin/env bash

set -e

mkdir -p logs
mkdir -p build_cache

echo "Installing server dependencies..."
cd server
npm ci --production || npm install --production

echo "Syncing Database..."
npx prisma generate
# Use migrate deploy instead of db push for safe production migrations
npx prisma migrate deploy

echo "Restarting backend server..."
pm2 restart shopsmart-backend || pm2 start src/index.js --name shopsmart-backend

echo "Installing routing capabilities..."
cd ../client
npm ci || npm install
npm run build

echo "Deployment cycle finished securely."
