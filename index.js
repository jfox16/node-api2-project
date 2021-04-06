// require your server and launch it here
const server = require('./api/server');

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
