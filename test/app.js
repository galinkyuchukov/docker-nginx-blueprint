const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end(`Request to ${req.headers.host} on port ${process.env.PORT}`);
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT);
