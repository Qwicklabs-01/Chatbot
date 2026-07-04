const fs = require('fs');
const https = require('https');
const path = require('path');

const libsDir = path.join(__dirname, 'libs');
if (!fs.existsSync(libsDir)) {
  fs.mkdirSync(libsDir);
}

const files = [
  {
    url: 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js',
    dest: path.join(libsDir, 'pdf-lib.min.js')
  },
  {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js',
    dest: path.join(libsDir, 'pdf.min.js')
  },
  {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js',
    dest: path.join(libsDir, 'pdf.worker.min.js')
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${path.basename(dest)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading offline libraries...');
  for (const f of files) {
    try {
      await downloadFile(f.url, f.dest);
    } catch (err) {
      console.error(`Failed to download ${f.url}: ${err.message}`);
    }
  }
  console.log('Finished downloading.');
}

main();
