const fs = require('fs');
const url = require('url');
const path = require('path');
const http = require('http');

function pipeFileToResponse(res, file, type) {
  if (type) {
    res.writeHead(200, {
      'Content-Type': type,
    });
  }

  fs.createReadStream(path.join(__dirname, file)).pipe(res);
}

const server = http.createServer((req, res) => {
  req.setEncoding('utf8');

  const parsed = url.parse(req.url, true);
  let { pathname } = parsed;

  console.log(`[${new Date()}]`, req.method, pathname);

  if (pathname === '/') {
    pathname = '/index.html';
  }

  if (pathname === '/index.html') {
    pipeFileToResponse(res, './client.html');
  } else if (pathname === '/jsonapi-fetch.js') {
    pipeFileToResponse(res, '../lib/jsonapi-fetch.js', 'text/javascript');
  } else if (pathname === '/api') {
    let status;
    let result;
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      try {
        status = 200;
        result = {
          url: req.url,
          data: data ? JSON.parse(data) : undefined,
          method: req.method,
          headers: req.headers,
        };
      } catch (e) {
        console.error('Error:', e.message);
        status = 400;
        result = {
          error: e.message,
        };
      }

      res.writeHead(status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(result));
    });
  } else {
    res.writeHead(404);
    res.end('<h1>404 Not Found</h1>');
  }
});

const PORT = 3000;

server.listen(PORT, console.log(`Listening on localhost:${PORT}...`));
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Address localhost:${PORT} in use please retry when the port is available!`);
    server.close();
  }
});
