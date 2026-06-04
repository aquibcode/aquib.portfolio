import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ContactMessage from "./models/ContactMessage.js";

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://127.0.0.1:5174";

let mongoStatus = "not-configured";

app.use(cors({ origin: clientOrigin }));
app.use(express.json({ limit: "1mb" }));

if (mongoUri) {
  mongoose
    .connect(mongoUri)
    .then(() => {
      mongoStatus = "connected";
      console.log("MongoDB connected");
    })
    .catch((error) => {
      mongoStatus = "error";
      console.error("MongoDB connection failed:", error.message);
    });
}

mongoose.connection.on("disconnected", () => {
  if (mongoUri) mongoStatus = "disconnected";
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "aquib-mern-portfolio",
    mongodb: mongoStatus
  });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim()
  };

  if (mongoStatus !== "connected") {
    console.log("Contact message received without MongoDB:", payload);
    return res.status(202).json({
      message: "Message received. Add MONGODB_URI in .env to store it in MongoDB.",
      stored: false
    });
  }

  try {
    const savedMessage = await ContactMessage.create(payload);
    return res.status(201).json({
      message: "Message sent successfully.",
      stored: true,
      id: savedMessage._id
    });
  } catch (error) {
    console.error("Contact save failed:", error.message);
    return res.status(500).json({ message: "Could not save message. Please try again." });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`API server running on http://127.0.0.1:${port}`);
});
