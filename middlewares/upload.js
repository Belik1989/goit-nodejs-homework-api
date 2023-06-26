const multer = require("multer");
const path = require("path");

const tempDIR = path.resolve(__dirname, "../temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDIR);
  },
  filename: (req, file, cb) => {
    cb(null, req.user._id + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
