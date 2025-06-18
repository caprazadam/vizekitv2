// VizeKit Node.js Entry Point for vizekit.com
const { spawn } = require('child_process');
const path = require('path');

console.log('VizeKit starting for Hostware...');

// Start the application
const appPath = path.join(__dirname, 'dist', 'index.js');
const app = spawn('node', [appPath], {
  stdio: 'inherit',
  env: { 
    ...process.env, 
    NODE_ENV: 'production',
    PORT: process.env.PORT || '3000'
  }
});

app.on('close', (code) => {
  console.log(`VizeKit process exited with code ${code}`);
  if (code !== 0) {
    console.log('Restarting VizeKit in 5 seconds...');
    setTimeout(() => {
      spawn('node', [__filename], { stdio: 'inherit' });
    }, 5000);
  }
});

app.on('error', (err) => {
  console.error('VizeKit startup error:', err);
});

process.on('SIGINT', () => {
  console.log('Shutting down VizeKit...');
  app.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down VizeKit...');
  app.kill();
  process.exit(0);
});