import Image from '../models/Image.js';
import Service from '../models/Service.js';
import Page from '../models/Page.js';
import { deleteFromCloudinary } from './cloudinary.js';

// Pictures uploaded from the dashboard come in two kinds:
//  - on Cloudinary:  https://res.cloudinary.com/<your cloud>/image/upload/.../altiora/<name>.webp   (the normal case)
//  - in MongoDB:     /api/images/<id>   (older uploads, or when Cloudinary is not set up)
// as opposed to the photos that ship with the website (/assets/...).
export const UPLOADED = /^\/api\/images\/([a-f0-9]{24})$/i;
const CLOUDINARY = /^https:\/\/res\.cloudinary\.com\//i;

// Only pictures from our own Cloudinary account are accepted (any account until CLOUDINARY_CLOUD_NAME is set)
const cloudName = () => (process.env.CLOUDINARY_CLOUD_NAME || '').trim();
const CLOUDINARY_PATH = /^https:\/\/res\.cloudinary\.com\/([a-z0-9_-]+)\/image\/upload\/(?:v\d+\/)?altiora\/[A-Za-z0-9_-]+\.webp$/i;
const SITE_PHOTO = /^\/assets\/[A-Za-z0-9._-]+\.(jpg|jpeg|png|webp)$/i;

// Accepts a website photo (/assets/...) or an uploaded one. Used as `IMAGE_PATH.test(value)`.
export const IMAGE_PATH = {
  test(value) {
    if (typeof value !== 'string') return false;
    if (SITE_PHOTO.test(value) || UPLOADED.test(value)) return true;
    const match = value.match(CLOUDINARY_PATH);
    return !!match && (!cloudName() || match[1].toLowerCase() === cloudName().toLowerCase());
  },
};

// Page fields that hold a picture are named ...image (for example about.image, hero1.image, logo.image)
export const isImageKey = (key) => key === 'image' || key.endsWith('.image');

// True when a page's editable content uses this picture
async function usedInPageContent(imageUrl) {
  const pages = await Page.find({}, { content: 1 }).lean();
  return pages.some((p) => Object.values(p.content || {}).includes(imageUrl));
}

// Deletes an uploaded picture (from Cloudinary or MongoDB) once no service or page uses it any more
export async function removeImageIfUnused(imageUrl) {
  const match = imageUrl && imageUrl.match(UPLOADED);
  if (!match && !CLOUDINARY.test(imageUrl || '')) return; // a website photo: nothing to delete
  const inUse =
    (await Service.exists({ image: imageUrl })) ||
    (await Page.exists({ 'seo.image': imageUrl })) ||
    (await usedInPageContent(imageUrl));
  if (inUse) return;
  if (match) await Image.deleteOne({ _id: match[1] });
  else await deleteFromCloudinary(imageUrl);
}
