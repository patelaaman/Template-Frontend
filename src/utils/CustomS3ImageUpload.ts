import { toast } from 'react-toastify';
import makeApiRequest from './apiServer';
import { useAuthContext } from '@/context/useAuthContext';

export interface FileUpload {
  key: string;
  fileType: string;
  fileObject: string; 
  documentType: string;
  documentName: string;
  documentDescription: string;
  fileSize: number;
}

interface ApiResponse<T> {
  status: number;
  data: T;
}

function base64ToBlob(base64: string, contentType: string): Blob {
  try {
    const base64WithoutHeader = base64.replace(/^data:.*;base64,/, '');
    const byteCharacters = atob(base64WithoutHeader);
    const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  } catch (error) {
    console.error('Error converting base64 to Blob:', error);
    throw new Error('Invalid base64 string or decoding failed.');
  }
}

export const uploadDoc = async (
  file: FileUpload[],
  userId: any,
  onProgress?: (progress: number) => void 
): Promise<string[] | null> => {
  const doc = file[0];

  
  if (!doc || !doc.fileType || !doc.documentName) {
    console.error('🚨 Invalid file object:', doc);
    toast.error('Invalid file type or missing data.');
    return null;
  }

  const extension = doc.fileType.split('/')[1] || 'jpg';
  const key = `posts/${userId}/${Date.now()}-${Math.random().toString(36).substring(7)}-${extension}`;

  try {
    // Step 1: Generate the Upload URL
    const generateUrlResponse = await makeApiRequest<ApiResponse<{ url: string }>>({
      method: 'POST',
      url: 'api/v1/auth/generate-upload-url',
      data: { key, expDate: 1500, contentType: doc.fileType },
    });

    if (!generateUrlResponse?.data?.url) {
      console.error('🚨 Upload URL missing:', generateUrlResponse);
      toast.error('Failed to generate upload URL.');
      return null;
    }

    // console.log('🔗 Upload URL generated:', generateUrlResponse.data.url);

    if (!doc.fileObject) {
      throw new Error('File object is missing.');
    }

    const blob = base64ToBlob(doc.fileObject, doc.fileType);

    // Step 2: Upload the file with progress tracking
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', generateUrlResponse.data.url, true);
      xhr.setRequestHeader('Content-Type', doc.fileType);

      // Track progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          console.log(`Upload Progress: ${percent}%`);
          if (onProgress) onProgress(percent);
        }
      };

      

      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log('✅ Upload successful');
          resolve();
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error during file upload.'));
      xhr.send(blob);
    });

    return [key];
  } catch (error: any) {
    console.error('❌ Error in uploadDoc:', error.message);
    toast.error(error.message || 'Upload failed.');
    return null;
  }
};




export const uploadMulti = async (files: FileUpload[], userId: string): Promise<string[]> => {
  try {
    console.log('📂 Uploading files:', files);

    // Process files in chunks of 4
    const chunkSize = 4;
    let mediaKeys: string[] = [];

    for (let i = 0; i < files.length; i += chunkSize) {
      const chunk = files.slice(i, i + chunkSize); // Get a batch of 4 files
      console.log(`🚀 Uploading batch ${i / chunkSize + 1}:`, chunk);

      const batchKeys = await Promise.all(
        chunk.map(async (file, index) => {
          if (!file || !file.fileType) {
            console.error(`🚨 Error: Missing fileType in file at index ${index}:`, file);
            return [];
          }

          try {
            const uploadedKeys = await uploadDoc([file], userId);
            console.log(`✅ Uploaded file ${index}:`, uploadedKeys);
            return Array.isArray(uploadedKeys) ? uploadedKeys : [];
          } catch (err) {
            console.error(`⚠️ Upload failed for file ${index}:`, err);
            return [];
          }
        })
      );

      mediaKeys.push(...batchKeys.flat()); // Store results
    }

    console.log('🎯 Final uploaded media keys:', mediaKeys);
    return mediaKeys;
  } catch (error) {
    console.error('❌ Error in uploadMulti:', error);
    return [];
  }
};
