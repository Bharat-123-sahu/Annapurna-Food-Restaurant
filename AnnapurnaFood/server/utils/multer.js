import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
//Storage
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
//File Types

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image file allowed"), false);
  }
};
const Upload = multer({
  storage: Storage,
  fileFilter: fileFilter,
});
export default Upload;
