const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello, welcome to the home page!');
        res.end();
      } else if (req.url === '/about') {
        res.write('This is the about page!');
        res.end();
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello, this is a simple Node.js web server!');
      }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});

setTimeout(() => {
    server.close(() => {
      console.log('Server stopped');
    });
  }, 10000);