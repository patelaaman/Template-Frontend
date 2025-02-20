export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      if (!url) {
        reject(new Error("createImage: No URL provided"));
        return;
      }
      console.log("Loading image:", url);
  
      const image = new Image();
      image.crossOrigin = "anonymous"; // Ensure CORS compliance
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(new Error(`Failed to load image: ${url}`));
  
      image.src = url;
    });
  