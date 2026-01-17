import express from "express";
import multer from "multer";
import { uploadFile, getFiles } from "../controllers/file.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);

export default router;
