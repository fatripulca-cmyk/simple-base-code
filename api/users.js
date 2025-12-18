const bodyParser = require('../lib/body-parser');

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

module.exports = async function userService(req, res) {
  switch (req.method) {
    // GET /api/users
    case 'GET':
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(users));
      return;
    // POST /api/users
    case 'POST':
      try {
        const data = await bodyParser(req);
        users.push(data);
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
