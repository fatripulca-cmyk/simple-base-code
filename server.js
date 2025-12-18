const http = require('http');
const path = require('path');
const serveStatic = require('./lib/serve-static');
const userService = require('./services/user-service');
const bookService = require('./services/book-service');

const PUBLIC_DIR = path.join(__dirname, 'public');
const port = {
  server: 8000,
  client: 3000,
}

const routes = {
  '/api/users': userService,
  '/api/books': bookService,
};

const client = http.createServer((req, res) => {
  serveStatic(req, res, PUBLIC_DIR);
});

const server = http.createServer((req, res) => {
  // ignore query strings
  const url = req.url.split('?')[0];
  const handler = routes[url];

  if (handler) {
    return handler(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

client.listen(port.client, () => {
  console.log(`Local server running at http://localhost:${port.client}`);
});

server.listen(port.server, () => {
  console.log(`Local server running at http://localhost:${port.server}`);
});
