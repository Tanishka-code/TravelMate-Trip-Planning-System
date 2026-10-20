const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { Server } = require("socket.io");
const { rateLimit } = require("express-rate-limit");

require("dotenv").config();

const tripRoutes = require("./routes/tripRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Security middleware
app.use(helmet());
app.use(cors());

// Limit JSON request size
app.use(express.json({ limit: "10kb" }));

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: {
    message: "Too many requests. Please try again later."
  }
});

app.use("/api", apiLimiter);

// Root route
app.get("/", (req, res) => {
  res.send("TravelMate API is Running");
});

// Existing TravelMate APIs
app.use("/api/trips", tripRoutes);
app.use("/api/users", userRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Secure error handler
app.use((error, req, res, next) => {
  console.error(error);

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message:
      statusCode < 500
        ? error.message
        : "Internal server error"
  });
});

// Socket.IO connection and chat events
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Receive and broadcast chat messages
  socket.on("chatMessage", (data) => {
    if (
      !data ||
      typeof data.username !== "string" ||
      typeof data.message !== "string"
    ) {
      return;
    }

    const username = data.username.trim();
    const message = data.message.trim();

    if (
      !username ||
      !message ||
      username.length > 50 ||
      message.length > 1000
    ) {
      return;
    }

    // Broadcast the message to all connected clients
    io.emit("chatMessage", {
      username,
      message
    });
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// MongoDB connection and server startup
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    console.log("Database:", mongoose.connection.name);

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(
      "MongoDB Connection Error:",
      error.message
    );
  });