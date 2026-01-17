import cloudinary from "../config/cloudinary.js";
import prisma from "../config/db.js";

export const uploadFile = async (req, res) => {
  try {
    console.log("👉 Upload endpoint hit");

    const file = req.file;
    console.log("👉 File:", file?.originalname);

    if (!file) {
      return res.status(400).json({ message: "No file selected" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file.buffer);
    });

    const savedFile = await prisma.file.create({
      data: {
        fileUrl: uploadResult.secure_url,
      },
    });

    res.status(201).json(savedFile);
  } catch (error) {
    console.error("🔥 Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getFiles = async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(files);
  } catch (error) {
    console.error("🔥 Fetch files error:", error);
    res.status(500).json({ message: "Failed to fetch files" });
  }
};
