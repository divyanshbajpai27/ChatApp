const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Enable CORS for all requests
app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (client) => {
  console.log(`Connection received from client: ${client.id}`);

  // Listen for new messages from clients
  client.on("new_message", (chat) => {
    console.log(`New message received: ${chat}`); // Log the received message
    // Emit the received message to all connected clients
    io.emit("broadcast", chat);
    console.log(`Broadcasting chat: ${chat}`); // Log the broadcasting action
  });

  // Optional: Handle client disconnection
  client.on("disconnect", () => {
    console.log(`Client disconnected: ${client.id}`);
  });
});

// Simple route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Use a default port if not set in the environment
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}...`);
});
