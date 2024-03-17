const http = require("http");
const routes = require("./route/routes");
const server = http.createServer(routes);
const bookRoutes = require("./route/routes");

const port = 3008;

//server listening 
server.listen(port, () => {
  console.log(`Server running on port  http://localhost:${port}`);
});