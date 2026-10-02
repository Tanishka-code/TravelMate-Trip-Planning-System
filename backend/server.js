const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

require("dotenv").config();

const tripRoutes = require("./routes/tripRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

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

// Existing Exp 4 Trip APIs
app.use("/api/trips", tripRoutes);

// Exp 5 User APIs
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

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
console.log("Database:", mongoose.connection.name);

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 5000}`
      );
    });
  })
  .catch((error) => {
    console.log(
      "MongoDB Connection Error:",
      error.message
    );
  });