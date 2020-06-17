const express = require("express");
const server = express();
const routes = require('./routes')

server.use(express.json());
server.use('/', routes)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
