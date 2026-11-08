import { v2 as cloudinary } from 'cloudinary';

// Cloudinary stores the pictures uploaded from the dashboard (https://cloudinary.com).
// It needs three values in the server's environment: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.
// Without them the server falls back to keeping uploads in MongoDB, so local development works with no account.

const FOLDER = 'altiora'; // all our pictures live in this Cloudinary folder

export const cloudinaryConfigured = () =>
  !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

function configure() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

// Uploads one picture (a Buffer) and resolves with its web address, e.g. https://res.cloudinary.com/<cloud>/image/upload/v1/altiora/abc.webp
export function uploadToCloudinary(buffer) {
  configure();
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: FOLDER, resource_type: 'image', format: 'webp', overwrite: false }, (err, result) => (err ? reject(err) : resolve(result.secure_url)))
      .end(buffer);
  });
}

// "https://res.cloudinary.com/<cloud>/image/upload/v123/altiora/abc.webp" -> "altiora/abc" (null if it is not one of ours)
export function publicIdFromUrl(url) {
  const match = String(url || '').match(/\/image\/upload\/(?:v\d+\/)?(altiora\/[A-Za-z0-9_-]+)\.[a-z]+$/i);
  return match ? match[1] : null;
}

// Deletes a picture from Cloudinary. Never throws: a failed delete only leaves an unused picture behind.
export async function deleteFromCloudinary(url) {
  const publicId = publicIdFromUrl(url);
  if (!publicId || !cloudinaryConfigured()) return;
  try {
    configure();
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  } catch (err) {
    console.error('Could not delete a picture from Cloudinary:', err.message);
  }
}
