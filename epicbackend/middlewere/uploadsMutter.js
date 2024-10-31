/*const multer = require("multer");

const internalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".").pop();
    cb(
      null,
      `${file.originalname
        .split(".")[0]
        .replace(/\s/g, "")}-${uniqueSuffix}.${fileExtension}`
    );
  },
});

const upload = multer({ storage: internalStorage });

module.exports = upload;
*/

const multer = require("multer");

const generateUniqueFilename = (originalname) => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const fileExtension = originalname.split(".").pop();
  const baseName = originalname.split(".")[0].replace(/\s/g, "");
  return `${baseName}-${uniqueSuffix}.${fileExtension}`;
};

const internalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, generateUniqueFilename(file.originalname));
  },
});

const upload = multer({ storage: internalStorage });

module.exports = upload;
