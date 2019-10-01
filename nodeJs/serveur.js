const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const user = 'Alexis';
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`Bonjour ${user}, tu es un nouvel apprenant d’Alyra!\n`);
});
server.listen(port, hostname, () => {
  console.log(`Le serveur est disponible à http://${hostname}:${port}/`);
});
