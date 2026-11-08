import { useState } from 'react';
import { imageUrl } from '../../api/client';
import useImageUpload, { MAX_IMAGE_MB } from '../../hooks/useImageUpload';

// One picture in a dashboard page editor: a preview, the file name, a "Change image" button and "Reset to original".
//   label: the field name       hint: a tip about the best picture      value: the current picture's web address
//   original: the photo that ships with the website (used by "Reset to original")
//   onChange(url): called with the new picture's address (an upload, or the original again)
export default function ImageField({ label, hint, value, original, onChange }) {
  const [errors, setErrors] = useState({});
  const { uploading, onFile } = useImageUpload({
    noun: 'image',
    setFieldErrors: setErrors,
    onUploaded: onChange,
  });

  const isChanged = value !== original;
  const fileName = value.startsWith('/api/images/') || value.startsWith('https://') ? 'Uploaded image' : value.split('/').pop();

  return (
    <div className="adm-field">
      <label>
        {label}
        {isChanged && <button type="button" className="adm-reset" onClick={() => onChange(original)}>Reset to original</button>}
      </label>
      <div className="adm-image-row">
        <img src={imageUrl(value)} alt="" />
        <div className="adm-image-meta">
          <p className="adm-file">{fileName}</p>
          {hint && <p className="adm-hint">{hint}</p>}
          <label className="adm-upload-btn">
            <input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={onFile} />
            <span>{uploading ? 'Uploading…' : 'Change image'}</span>
          </label>
          <p className="adm-hint">JPG, PNG or WebP, up to {MAX_IMAGE_MB} MB.</p>
          {errors.image && <span className="adm-err">{errors.image[0]}</span>}
        </div>
      </div>
    </div>
  );
}
