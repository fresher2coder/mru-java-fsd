const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("data/db.json");
const middleware = jsonServer.defaults();

const cors = require("cors");
server.use(cors());
server.use(middleware);
server.use(router);

server.listen(3000, () => {
  console.log("Server is Running at http://localhost:3000");
});
