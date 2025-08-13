const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Poker server is running 🚀");
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
