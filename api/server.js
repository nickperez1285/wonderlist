const express = require("express");
const server = express();
const routes = require("./routes");
const authRoutes = require("../auth/auth.js");

const cookieParcer = require("cookie-parser");

server.use(express.json());
server.use(cookieParcer());
// server.use("/", routes);
server.use("/api/auth", authRoutes);
server.use(function(req,res,next){ req.name = "john"});

server.get("/", (req, res) => {
  res.json({ name: req.name });
});

module.exports = server;
