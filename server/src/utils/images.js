import Image from '../models/Image.js';
import Service from '../models/Service.js';
import Page from '../models/Page.js';

// Matches pictures uploaded from the dashboard (/api/images/<id>), as opposed to photos that ship with the website
export const UPLOADED = /^\/api\/images\/([a-f0-9]{24})$/i;

// Accepts a website photo (/assets/...) or an uploaded one
export const IMAGE_PATH = /^(\/assets\/[A-Za-z0-9._-]+\.(jpg|jpeg|png|webp)|\/api\/images\/[a-f0-9]{24})$/i;

// Deletes an uploaded picture from the database once no service or page uses it any more
export async function removeImageIfUnused(imageUrl) {
  const match = imageUrl && imageUrl.match(UPLOADED);
  if (!match) return;
  const inUse =
    (await Service.exists({ image: imageUrl })) ||
    (await Page.exists({ 'seo.image': imageUrl }));
  if (inUse) return;
  await Image.deleteOne({ _id: match[1] });
}
