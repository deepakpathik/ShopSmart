# 1. Environment & Pre-requisites
if [ ! -f "server/.env" ]; then
    echo "Warning: .env file missing in server directory."
fi

# 2. Safe Directory Creation
mkdir -p logs build_cache

# 3. Backend Deployment
echo ">>> Deploying Backend..."
cd server
npm ci --production

echo ">>> Syncing Database Schema..."
npx prisma generate
npx prisma migrate deploy

echo ">>> Managing Backend Process (PM2)..."
# Check if process is already running
if pm2 show shopsmart-backend > /dev/null 2>&1; then
    echo "Restarting existing process..."
    pm2 restart shopsmart-backend --update-env
else
    echo "Starting new process..."
    pm2 start src/index.js --name shopsmart-backend
fi
pm2 save

# 4. Frontend Deployment
echo ">>> Deploying Frontend..."
cd ../client
npm ci
npm run build

echo ">>> Deployment successfully completed (Idempotent)."
