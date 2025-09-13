const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "DestinationImages",
    allowed_formats: ["png", "jpeg", "jpg"], // Include jpg
    public_id: (req, file) => {
      return Date.now() + "-" + Math.round(Math.random() * 1e9); // Unique file name
    },
  },
});

const fileFilter = (req, file, cb) => {
  const allowedType = /jpg|jpeg|png/;
  const mimetype = allowedType.test(file.mimetype);
  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png) are allowed!"), false);
  }
};

const UpdatePackageMiddleWare = multer({
  storage,
  fileFilter,
  limits: { fileSize: 300 * 1024 }, // 300kb
});

// Export a middleware that accepts indexed fields
module.exports= UpdatePackageMiddleWare.fields([
  { name: "Image[0]", maxCount: 1 },
  { name: "Image[1]", maxCount: 1 },
  { name: "Image[2]", maxCount: 1 },
  { name: "Image[3]", maxCount: 1 },
  { name: "Image[4]", maxCount: 1 },
]);
