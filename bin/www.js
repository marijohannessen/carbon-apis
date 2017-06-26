const server = require('../server');
const port = process.env.PORT || 8080;
server.listen(port, err => {
  if (err) throw err;
  console.log(`> Express: Ready on port ${port}`);
});
