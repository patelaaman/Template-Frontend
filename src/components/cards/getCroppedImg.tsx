import { createImage } from "./createImage";

export const getCroppedImg = async (imageSrc, pixelCrop) => {
    try {
      console.log("getCroppedImg: Processing image", imageSrc, pixelCrop);
  
      const image = await createImage(imageSrc);
      if (!image) {
        throw new Error("Failed to load image");
      }
  
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      if (!ctx) {
        throw new Error("Failed to get canvas context");
      }
  
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
  
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
  
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas blob is null"));
            return;
          }
          const croppedImageUrl = URL.createObjectURL(blob);
          console.log("Cropped image URL:", croppedImageUrl);
          resolve(croppedImageUrl);
        }, "image/jpeg");
      });
    } catch (error) {
      console.error("Error in getCroppedImg:", error);
      return null;
    }
  };
  