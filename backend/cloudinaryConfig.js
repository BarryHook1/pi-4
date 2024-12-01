const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware para upload manual com Cloudinary
const uploadToCloudinary = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nenhum arquivo enviado." });
  }

  const stream = cloudinary.uploader.upload_stream(
    { folder: "uploads" },
    (err, result) => {
      if (err) {
        console.error("Erro ao fazer upload:", err);
        return res
          .status(500)
          .json({ message: "Erro ao fazer upload da imagem." });
      }
      req.file.url = result.secure_url;
      next();
    }
  );

  const readableStream = new Readable();
  readableStream.push(req.file.buffer);
  readableStream.push(null);
  readableStream.pipe(stream);
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = { upload, uploadToCloudinary };
