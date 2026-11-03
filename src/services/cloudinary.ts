/**
 * Cloudinary Image Upload Service with Fallback
 */

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

export const getCloudinaryConfig = (): CloudinaryConfig => {
  return {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || localStorage.getItem('mgd_cloudinary_cloud_name') || '',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || localStorage.getItem('mgd_cloudinary_preset') || '',
  };
};

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const config = getCloudinaryConfig();

  // If Cloudinary credentials are configured, upload to Cloudinary API
  if (config.cloudName && config.uploadPreset) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', config.uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url || data.url;
    } catch (err) {
      console.warn('Cloudinary upload failed, falling back to local base64 reader:', err);
    }
  }

  // Graceful fallback: convert to base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };
    reader.readAsDataURL(file);
  });
}
