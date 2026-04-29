const multer = require('multer');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '../uploads');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) => {
    const name = 'plant-' + Date.now() + path.extname(file.originalname);
    cb(null, name);
  }
});

const filter = (req, file, cb) => {
  if (/jpeg|jpg|png|webp/.test(file.mimetype)) cb(null, true);
  else cb(new Error('Only JPG, PNG, WEBP images allowed'));
};

module.exports = multer({ storage, fileFilter: filter, limits: { fileSize: 5 * 1024 * 1024 } });
