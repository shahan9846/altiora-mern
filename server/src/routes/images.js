import { Router } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import sharp from 'sharp';
import Image from '../models/Image.js';
import { requireAuth } from '../middleware/auth.js';
import { cloudinaryConfigured, uploadToCloudinary } from '../utils/cloudinary.js';

const router = Router();

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB upload limit
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_BYTES, files: 1 } });

// POST /api/images (admin only, multipart field "image")
// Checks it is a real image, fixes its rotation, shrinks it to at most 1600px wide and stores it as WebP.
// It is saved on Cloudinary (or in MongoDB when Cloudinary is not set up) and the answer is the picture's web address.
router.post('/', requireAuth, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      const message = err.code === 'LIMIT_FILE_SIZE' ? 'That image is too large (maximum 5 MB).' : 'Could not read the upload.';
      return res.status(400).json({ message });
    }
    next();
  });
}, async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please choose an image.' });
    let output;
    try {
      // 30 megapixels covers any phone photo and keeps memory use low on small (512 MB) hosting plans
      output = await sharp(req.file.buffer, { limitInputPixels: 30_000_000 })
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
    } catch {
      return res.status(400).json({ message: 'That file is not a valid image. Please use a JPG, PNG or WebP photo.' });
    }
    if (cloudinaryConfigured()) {
      try {
        return res.status(201).json({ url: await uploadToCloudinary(output) });
      } catch (err) {
        console.error('Cloudinary upload failed:', err.message);
        return res.status(502).json({ message: 'The image could not be saved. Please try again.' });
      }
    }
    const doc = await Image.create({
      data: output,
      contentType: 'image/webp',
      size: output.length,
      originalName: String(req.file.originalname || '').slice(0, 200),
    });
    res.status(201).json({ url: `/api/images/${doc._id}` });
  } catch (err) {
    next(err);
  }
});

// GET /api/images/:id (public): the stored picture
router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).end();
    const doc = await Image.findById(req.params.id).lean();
    if (!doc) return res.status(404).end();
    res.set({
      'Content-Type': doc.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable', // a picture never changes under the same id
      // the website is on a different address than the API, so allow it to show these pictures
      'Cross-Origin-Resource-Policy': 'cross-origin',
    });
    res.send(doc.data.buffer ? Buffer.from(doc.data.buffer) : doc.data);
  } catch (err) {
    next(err);
  }
});

export default router;
