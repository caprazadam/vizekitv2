#!/bin/bash

# VizeKit Deployment Script
echo "🚀 VizeKit Deployment Starting..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    npm install -g pm2
fi

# Create logs directory
mkdir -p logs

# Stop existing application if running
pm2 stop vizekit 2>/dev/null || true

# Start the application
echo "🚀 Starting VizeKit with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup | tail -1 | sudo bash 2>/dev/null || echo "⚠️  Please run 'pm2 startup' manually with sudo"

echo "✅ VizeKit deployment completed!"
echo "📊 Check status with: pm2 status"
echo "📋 View logs with: pm2 logs vizekit"
echo "🔄 Restart with: pm2 restart vizekit"