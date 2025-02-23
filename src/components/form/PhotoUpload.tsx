import { useState } from 'react'
import { Card, Col, FormLabel, FormText, Row, Alert } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import { BsUpload } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

type PhotoUploadProps = {
  label?: string
  labelClassName?: string
  helpText?: string
  showPreview?: boolean
  icon?: React.ComponentType<any>
  iconProps?: React.ComponentProps<any>
  text?: string
  textClassName?: string
  onFileUpload?: (files: FileUpload[]) => void
}

interface FileUpload {
  key: string
  fileType: string
  fileObject: string // Base64 encoded file content
  documentType: string
  documentName: string
  documentDescription: string
  fileSize: number
  preview?: string
}

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
}: PhotoUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileUpload[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleAcceptedFiles = (files: File[]) => {
    const totalFiles = selectedFiles.length + files.length;
  
    if (totalFiles > 4) {
      setError("You can only upload up to 4 images.");
      return;
    }
  
    if (totalFiles < 1) {
      setError("You must upload at least 1 image.");
      return;
    }
  
    let newFiles: FileUpload[] = [...selectedFiles];
    let fileNames = new Set(selectedFiles.map(file => file.key));
  
    files.forEach((file) => {
      if (fileNames.has(file.name)) {
        setError(`"${file.name}" is already uploaded. Please select unique images.`);
        return;
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
  
        const fileUploadData: FileUpload = {
          key: file.name,
          fileType: file.type,
          fileObject: base64String,
          documentType: 'image',
          documentName: file.name,
          documentDescription: 'Uploaded image file',
          fileSize: file.size,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        };
  
        newFiles.push(fileUploadData);
  
        setSelectedFiles(newFiles); // Update the state with new images
        if (onFileUpload) onFileUpload(newFiles);
      };
      reader.readAsDataURL(file);
    });
  
    setError(null); // Clear errors if successful
  };
  

  const removeFile = (fileToRemove: FileUpload) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = prevFiles.filter((file) => file.key !== fileToRemove.key)
      if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview) // Prevent memory leak
      if (onFileUpload) onFileUpload(newFiles)
      return newFiles
    })
    setError(null) // Clear error when removing a file
  }

  const Icon = icon ?? BsUpload

  return (
    <>
      <FormLabel className={labelClassName}>{label}</FormLabel>

      {error && <Alert variant="danger">{error}</Alert>}

      <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)} maxFiles={1}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone dropzone-custom cursor-pointer p-3 border rounded text-center" style={{ opacity: selectedFiles.length === 4 ? 0.5 : 1, backgroundColor:'white', border:"3px solid black", height:"40px", width:"100px", alignItems:"center", justifyContent:"center" }}>
            <div {...getRootProps()}>
              <input {...getInputProps()} disabled={selectedFiles.length === 4} />
              <Icon {...iconProps} className="display-3 text-muted" size={30} style={{marginTop:"-15px"}} />
              <p className="mt-2 text-secondary" style={{display:"none"}}>
                {text || 'Drag & drop up to 4 unique images or click to upload'}
              </p>
            </div>
          </div>
        )}
      </Dropzone>

      {/* Image Preview */}
      {selectedFiles.length > 0 && (
        <div className="border rounded p-60 mt-3 bg-light" style={{ padding: '0px', boxShadow: '0 0 10px rgba(8, 6, 6, 0.1)' }}>
          <Row className="g-3">
            {selectedFiles.map((file, idx) => (
              <Col md={3} sm={4} xs={6} key={`file-${idx}-${file.key}`}>
                <Card className="p-2 mb-0 shadow-none border position-relative d-flex align-items-center justify-content-center"
                  style={{ width: '220px', height: '120px',marginLeft:"-380px", marginTop:"150px", padding: "15px",
                    boxShadow: "10px 10px 5px 12px lightblue",overflow: 'hidden' }}>
                  {file.preview ? (
                    <img
                      alt={file.documentName}
                      src={file.preview}
                      className="rounded bg-light"
                      style={{ width: '80%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="rounded bg-light text-center p-2 d-flex align-items-center justify-content-center"
                      style={{ width: '100%', height: '100%',backgroundImage:"no-repeat", fontSize: '14px' }}>
                      {file.documentName.split('.').pop()?.toUpperCase()}
                    </div>
                  )}
                  <button
                    className="btn btn-danger rounded-circle p-1 position-absolute top-0 end-0 m-1"
                    onClick={() => removeFile(file)}
                    style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <FaTimes size={12} />
                  </button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {helpText && <FormText className="text-muted">{helpText}</FormText>}
    </>
  )
}

export default DropzoneFormInput
