const path = require("path");
const multer = require("multer");

// Multer storage config for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Folder to store uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// File type filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only .jpeg, .png, and .gif files are allowed"), false);
  }
  cb(null, true);
};

// Multer uploader instance
const imageUploader = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFilter,
});

// Middleware for single image upload
function uploadImageSingle(fieldName) {
  return (req, res, next) => {
    const upload = imageUploader.single(fieldName);
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      }
      next();
    });
  };
}

module.exports = {
  uploadImageSingle,
};
