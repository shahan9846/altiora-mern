import { useState } from 'react';
import { uploadImage } from '../api/admin';

export const MAX_IMAGE_MB = 5;

// Picking a photo in a dashboard form: checks the file, uploads it, and gives its web address to `onUploaded`.
//   noun: the word used in the messages ('photo' or 'image')     setFieldErrors: the form's error setter
//   onUploaded(url): called with the address of the uploaded picture
// Use:  const { uploading, onFile } = useImageUpload({ noun: 'photo', setFieldErrors, onUploaded });
//       <input type="file" onChange={onFile} />
export default function useImageUpload({ noun, setFieldErrors, onUploaded }) {
  const [uploading, setUploading] = useState(false);

  const showError = (message) => setFieldErrors((errors) => ({ ...errors, image: [message] }));

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // lets the same file be chosen again
    if (!file) return;

    setFieldErrors((errors) => ({ ...errors, image: undefined }));
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return showError(`Please choose a JPG, PNG or WebP ${noun}.`);
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) return showError(`That ${noun} is too large (maximum ${MAX_IMAGE_MB} MB).`);

    setUploading(true);
    try {
      const { url } = await uploadImage(file);
      onUploaded(url);
    } catch (err) {
      showError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return { uploading, onFile };
}
