#!/usr/bin/env bash

set -e

mkdir -p logs
mkdir -p build_cache

echo "Installing server dependencies..."
cd server
npm install --production

echo "Syncing Database..."
npx prisma generate
npx prisma db push --accept-data-loss

echo "Installing routing capabilities..."
cd ../client
npm install
npm run build

echo "Deployment cycle finished securely."
