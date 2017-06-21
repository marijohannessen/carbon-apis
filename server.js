const express = require('express');
const next = require('next');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(compression());

  server.get('/', (req, res) => {
    return app.render(req, res, '/index', req.query);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(8080, err => {
    if (err) throw err;
    console.log('> Express: Ready on http://localhost:8080');
  });
});
