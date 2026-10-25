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

const configuredOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const allowedOrigins = [
  ...configuredOrigins,
  "http://localhost:5173",
  "http://localhost:5174"
];

const checkOrigin = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
    return;
  }

  const error = new Error("Origin is not allowed by CORS");
  error.statusCode = 403;
  callback(error);
};

// Shared CORS configuration
const corsOptions = {
  origin: checkOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    ...corsOptions,
    origin: checkOrigin
  },
  transports: ["websocket", "polling"]
});

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));

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

app.get("/health", (req, res) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1;

  res.status(isDatabaseConnected ? 200 : 503).json({
    status: isDatabaseConnected ? "ok" : "unavailable",
    database: isDatabaseConnected ? "connected" : "disconnected"
  });
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

    const timestamp = new Date().toISOString();

    // Broadcast to all connected clients
    io.emit("chatMessage", {
      username,
      message,
      timestamp
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const requiredEnvironmentVariables = ["MONGO_URI", "JWT_SECRET"];
const missingEnvironmentVariables = requiredEnvironmentVariables.filter(
  (name) => !process.env[name]?.trim()
);
const port = Number(process.env.PORT || 5000);
const trustProxyHops = Number(process.env.TRUST_PROXY || 0);

if (missingEnvironmentVariables.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvironmentVariables.join(", ")}`
  );
  process.exit(1);
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("PORT must be an integer between 1 and 65535.");
  process.exit(1);
}

if (!Number.isInteger(trustProxyHops) || trustProxyHops < 0) {
  console.error("TRUST_PROXY must be a non-negative integer.");
  process.exit(1);
}

app.set("trust proxy", trustProxyHops);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    console.log("Database:", mongoose.connection.name);

    server.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exitCode = 1;
    await mongoose.disconnect();
  }
};

server.on("error", (error) => {
  console.error(`HTTP server failed to listen: ${error.message}`);
  process.exitCode = 1;
  mongoose.disconnect().finally(() => process.exit(1));
});

startServer();