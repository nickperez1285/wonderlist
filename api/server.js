const express = require("express");
const server = express();
const routes = require("./routes");
const authRoutes = require("../auth/auth.js");

server.use(express.json());
server.use("/", routes);
server.use("/api/auth", authRoutes);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
