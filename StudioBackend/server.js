const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ImageKit = require("imagekit");
require("dotenv").config();

const app = express();

// ImageKit initialization
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// CORS Configuration
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/rstudio")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Make ImageKit available to routes
app.locals.imagekit = imagekit;

// ImageKit Authentication Endpoint - V1 API (Simpler & More Stable)
app.get("/api/imagekit-auth", (req, res) => {
  try {
    // Generate authentication parameters using ImageKit SDK
    const authenticationParameters = imagekit.getAuthenticationParameters();

    res.set({
      "Access-Control-Allow-Origin": "*",
    });

    res.status(200).json({
      ...authenticationParameters,
      publicKey: "public_J4GWc43yE4vFz1Lgx53iBfiGkAo=",
    });
  } catch (error) {
    console.error("Error generating auth:", error);
    res.status(500).json({
      success: false,
      message: "Error generating authentication",
      error: error.message,
    });
  }
});

// Routes
app.use("/api/studios", require("./routes/studios"));

// Health Check
app.get("/api/health", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
  });
  res.json({
    status: "OK",
    message: "R-Studio API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.set({
    "Access-Control-Allow-Origin": "*",
  });
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
  console.log(
    `🔐 ImageKit auth endpoint: http://localhost:${PORT}/api/imagekit-auth`
  );
});

module.exports = app;
