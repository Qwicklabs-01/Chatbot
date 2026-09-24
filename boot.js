const { spawn } = require('child_process');

console.log("🚀 Initializing OmniBrain Pro Master Ecosystem...");

// 1. Start a persistent, fixed-URL localtunnel for Ollama
console.log("🌐 Securing permanent tunnel to Vercel (https://omnibrain-pro-sakshi.loca.lt)...");
const lt = spawn('npx', ['localtunnel', '--port', '11434', '--subdomain', 'omnibrain-pro-sakshi'], { shell: true });

lt.stdout.on('data', (data) => {
    console.log(`[Tunnel] ${data.toString().trim()}`);
});

lt.stderr.on('data', (data) => {
    console.error(`[Tunnel Error] ${data.toString().trim()}`);
});

// 2. Boot the local Express Server
console.log("🤖 Booting Local Node.js Server...");
require('./api/chat.js');
