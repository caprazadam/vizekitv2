#!/bin/bash

# Hostware.com.tr Node.js Setup Script
echo "🚀 Hostware VizeKit Setup Starting..."

# Create necessary directories
mkdir -p logs
mkdir -p tmp

# Install production dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build the application
echo "🔨 Building application..."
npm run build

# Create .htaccess for proper routing (if needed)
cat > .htaccess << 'EOF'
# Redirect all requests to Node.js app
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /app.js [L]
EOF

# Create app.js entry point for hostware
cat > app.js << 'EOF'
// Hostware Node.js Entry Point
const { spawn } = require('child_process');
const path = require('path');

// Start the application
const appPath = path.join(__dirname, 'dist', 'index.js');
const app = spawn('node', [appPath], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
});

app.on('close', (code) => {
  console.log(`VizeKit process exited with code ${code}`);
  if (code !== 0) {
    // Restart on failure
    setTimeout(() => {
      spawn('node', [__filename], { stdio: 'inherit' });
    }, 5000);
  }
});
EOF

# Set proper permissions
chmod +x app.js

echo "✅ Hostware setup completed!"
echo "📋 Next steps:"
echo "1. Upload all files to public_html/"
echo "2. Set Node.js app startup file to: app.js"
echo "3. Set environment variables in cPanel"
echo "4. Start the Node.js application"