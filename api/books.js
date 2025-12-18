const bodyParser = require('../lib/body-parser');

const books = [
  { id: 1, title: 'Clean Code' },
  { id: 2, title: 'You Don\'t Know JS' }
];

module.exports = async function bookService(req, res) {
  switch (req.method) {
    // GET /api/books
    case 'GET':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(books));
      return;
    // POST /api/books
    case 'POST':
      try {
        const data = await bodyParser(req);
        books.push(data);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      } catch (err) {
        res.statusCode = 400;
        res.end(err.message);
      }
      return;
    default:
      res.statusCode = 405;
      res.setHeader('Allow', 'GET, POST');
      res.end('Method Not Allowed');
      return;
  }
};
