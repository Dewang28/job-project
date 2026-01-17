// index.js
import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first

import express from "express";
import cors from "cors";
import fileRoutes from "./routes/file.routes.js";

// ✅ Debugging: Log the variables we actually need
console.log("ENV CHECK:", {
  Cloud_Name: process.env.CLOUDINARY_CLOUD_NAME,
  API_Key: process.env.CLOUDINARY_API_KEY ? "Loaded" : "MISSING",
  API_Secret: process.env.CLOUDINARY_API_SECRET ? "Loaded" : "MISSING",
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/files", fileRoutes);

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);