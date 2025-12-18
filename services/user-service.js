const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

module.exports = function userService(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end('Method Not Allowed');
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
};
