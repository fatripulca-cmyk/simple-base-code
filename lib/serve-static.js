const fs = require('fs');
const path = require('path');

const mime_types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

function serveStatic(req, res, public_dir) {
  if (req.method !== 'GET') {
    res.writeHead(405);
    res.end('Method Not Allowed');
    return;
  }

  const filePath = req.url === '/' ? path.join(public_dir, 'index.html') : path.join(public_dir, req.url);
  const ext = path.extname(filePath);
  const contentType = mime_types[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

module.exports = serveStatic;
