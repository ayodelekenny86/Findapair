#!/bin/bash

# FindAPair Deployment Script
# This script handles deployment to production

set -e  # Exit on error

echo "🚀 Starting FindAPair deployment..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found! Please create .env from .env.example"
    exit 1
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

# Step 1: Build the application
echo "📦 Building application..."
npm run build

# Step 2: Run database migrations
echo "🗄️ Running database migrations..."
npm run db:migrate

# Step 3: Seed database (optional, comment out in production)
# echo "🌱 Seeding database..."
# npm run db:seed

# Step 4: Start the application
echo "🎉 Starting application..."
npm start

echo "✅ Deployment completed successfully!"
echo "🌍 Application is running on port ${PORT:-3001}"
