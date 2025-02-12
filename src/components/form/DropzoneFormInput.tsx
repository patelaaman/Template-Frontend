import { useState } from 'react'
import { Card, Col, FormLabel, FormText } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { BsUpload } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

import imageCompression from "browser-image-compression";

interface FileUpload {
  key: string;
  fileType: string;
  fileObject: string;
  documentType: "image" | "video";
  documentName: string;
  documentDescription: string;
  fileSize: number;
  preview?: string;
}

type DropzoneFormInputProps = {
  label?: string;
  labelClassName?: string;
  helpText?: string;
  showPreview?: boolean;
  icon?: React.ComponentType<any>;
  iconProps?: React.ComponentProps<any>;
  text?: string;
  textClassName?: string;
  onFileUpload?: (files: FileUpload[]) => void;
};

const DropzoneFormInput = ({
  label,
  labelClassName,
  helpText,
  icon,
  iconProps,
  showPreview,
  text,
  textClassName,
  onFileUpload,
}: DropzoneFormInputProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([]);
  const [alert, setAlert] = useState("");

  // Compress Image
  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 2, // Target size in MB
      maxWidthOrHeight: 1920, // Resize dimensions
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Image compression error:", error);
      return file; // Return original if compression fails
    }
  };

  // Handle file uploads
  const handleAcceptedFiles = async (files: File[]) => {
    if (files.length === 0) return;

    const validFiles = files.filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"));

    if (validFiles.length + selectedFiles.length > 10) {
      toast.info("You can upload a maximum of 10 media files.");
      setAlert("You can upload a maximum of 10 media files.");
      return;
    }

    const filePromises = validFiles.map(async (file) => {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast.error(`File ${file.name} exceeds the 100MB limit.`);
        return null;
      }

      let processedFile = file;

      // Compress images if needed
      if (file.type.startsWith("image/") && file.size > 2 * 1024 * 1024) { // Compress only if >2MB
        processedFile = await compressImage(file);
      }

      return new Promise<FileUpload>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            key: processedFile.name,
            fileType: processedFile.type,
            fileObject: reader.result as string,
            documentType: processedFile.type.startsWith("image/") ? "image" : "video",
            documentName: processedFile.name,
            documentDescription: "Uploaded media file",
            fileSize: processedFile.size,
            preview: processedFile.type.startsWith("image/") ? URL.createObjectURL(processedFile) : undefined,
          });
        };
        reader.readAsDataURL(processedFile);
      });
    });

    const uploadedFiles = (await Promise.all(filePromises)).filter(Boolean) as FileUpload[];

    // Remove duplicates based on file name
    const uniqueFiles = [...selectedFiles, ...uploadedFiles.filter((newFile) => !selectedFiles.some((f) => f.key === newFile.key))];

    if (uniqueFiles.length < 1) {
      toast.info("You must upload at least one media file.");
      setAlert("You must upload at least one media file.");
      return;
    }

    setSelectedFiles(uniqueFiles);
    onFileUpload?.(uniqueFiles);
  };

  // Remove file
  const removeFile = (file: FileUpload) => {
    const updatedFiles = selectedFiles.filter((f) => f.key !== file.key);
    setSelectedFiles(updatedFiles);
    onFileUpload?.(updatedFiles);
  };

  const Icon = icon ?? BsUpload;

  return (
    <>
      <FormLabel className={labelClassName}>{label}</FormLabel>
      <p className="text-danger">{alert}</p>
      <Dropzone onDrop={handleAcceptedFiles} maxFiles={10} accept={{ "image/*": [], "video/*": [] }}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone dropzone-custom cursor-pointer">
            <div className="dz-message" {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon {...iconProps} className="display-3" />
              <p className={textClassName}>{text}</p>
            </div>
            {showPreview && selectedFiles.length > 0 && (
              <div className="dz-preview row g-4">
                {selectedFiles.map((file) => (
                  <Col md={4} sm={6} key={file.key}>
                    <Card className="p-2 mb-0 shadow-none border position-relative h-100">
                      {file.preview ? (
                        <img alt={file.documentName} src={file.preview} className="rounded bg-light w-100" />
                      ) : (
                        <div className="rounded bg-light text-center">{file.documentType.toUpperCase()}</div>
                      )}
                      <div className="mt-2">
                        <p className="mb-0 small">{(file.fileSize / 1024).toFixed(2)} KB</p>
                      </div>
                      <div className="position-absolute top-0 start-100 translate-middle">
                        <button
                          className="btn btn-danger rounded-circle icon-sm p-0 d-flex align-items-center justify-content-center"
                          onClick={() => removeFile(file)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {helpText && <FormText>{helpText}</FormText>}
    </>
  );
};

export default DropzoneFormInput;
